import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "../supabase";
import { getOwnerEmail, getTrustedRole } from "../utils/security";

const AuthContext = createContext();
const OWNER_EMAIL = getOwnerEmail();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileReady, setProfileReady] = useState(false);
  const [profileMissing, setProfileMissing] = useState(false);
  const [loading, setLoading] = useState(true);

  const ensureProfileRole = useCallback(async (currentUser, fallbackRole) => {
    if (!currentUser || !fallbackRole) {
      return false;
    }

    const payload = {
      id: currentUser.id,
      email: currentUser.email,
      role: fallbackRole,
    };

    const { error } = await supabase.from("profiles").upsert(payload);

    if (error) {
      console.error("Profile bootstrap failed:", error);
      return false;
    }

    return true;
  }, []);

  const resolveRole = useCallback(async (currentUser) => {
    if (!currentUser) {
      setRole(null);
      setProfileReady(false);
      setProfileMissing(false);
      return null;
    }

    const fallbackRole = getTrustedRole(currentUser);
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (error) {
      console.error("Profile fetch failed:", error);
      // If we can derive the role from the email (e.g. owner) treat it as
      // ready even if the DB fetch failed — avoids blocking the owner on
      // mobile when the network hiccups on first load.
      const canTrust = Boolean(fallbackRole);
      setRole(fallbackRole);
      setProfileReady(canTrust);
      setProfileMissing(!canTrust);
      return fallbackRole;
    }

    if (profile?.role) {
      setRole(profile.role);
      setProfileReady(true);
      setProfileMissing(false);
      return profile.role;
    }

    // No profile row yet — try to bootstrap it.
    const bootstrapped = await ensureProfileRole(currentUser, fallbackRole);

    if (fallbackRole) {
      // We know the role from the email allow-list / owner email; treat it
      // as ready regardless of whether the upsert succeeded.  The banner
      // should never block the owner on mobile.
      setRole(fallbackRole);
      setProfileReady(true);
      setProfileMissing(false);
      return fallbackRole;
    }

    // Unknown user — genuinely incomplete profile.
    setRole(null);
    setProfileReady(false);
    setProfileMissing(true);
    return null;
  }, [ensureProfileRole]);


  const resolveRoleInBackground = useCallback(
    (currentUser) => {
      resolveRole(currentUser).catch((error) => {
        console.error("Role resolution failed:", error);
      });
    },
    [resolveRole],
  );

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user || null;

      setUser(currentUser);
      resolveRoleInBackground(currentUser);

      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        resolveRoleInBackground(currentUser);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [resolveRoleInBackground]);

  const clearLocalAuthState = () => {
    setUser(null);
    setRole(null);
    setProfileReady(false);
    setProfileMissing(false);

    try {
      const storageKeys = [
        ...Object.keys(localStorage),
        ...Object.keys(sessionStorage),
      ];

      storageKeys.forEach((key) => {
        if (key.toLowerCase().includes("supabase")) {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Failed to clear local auth storage:", error);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    const currentUser = data.user || data.session?.user || null;
    setUser(currentUser);
    resolveRoleInBackground(currentUser);

    return { error: null };
  };

  const createFaculty = async (email, password) => {
    if (getTrustedRole(user) !== "owner") {
      return { message: "Only owner can create faculty" };
    }

    // Save current owner session
    const { data: currentSession } = await supabase.auth.getSession();
    const ownerSession = currentSession.session;

    // Create new faculty account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return error;

    // Give the new account its faculty role immediately instead of relying
    // only on the background bootstrap (which needs app_metadata.role or the
    // VITE_FACULTY_EMAILS allow-list to produce a role).
    const newUserId = data?.user?.id;

    if (newUserId) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: newUserId, email, role: "faculty" });

      if (profileError) {
        console.error("Faculty profile upsert failed:", profileError);
      }
    }

    // Restore owner session immediately
    if (ownerSession) {
      await supabase.auth.setSession(ownerSession);
    }

    return null;
  };

  const logout = async () => {
    // Sign out FIRST (invalidates the session), then purge local state — if
    // we cleared storage before signOut, a failing signOut could leave the
    // UI and storage out of sync. The timeout keeps logout from hanging when
    // the network is slow or unavailable.
    const signOutPromise = supabase.auth.signOut({ scope: "local" });
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve({ error: null }), 1500),
    );
    const result = await Promise.race([signOutPromise, timeoutPromise]);
    const error = result?.error || null;

    // Always purge local auth state, even if signOut itself failed, so the
    // user is never stuck "logged in" with broken storage.
    clearLocalAuthState();

    if (error) {
      console.error("Logout failed:", error);
    }

    return error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profileReady,
        profileMissing,
        login,
        logout,
        createFaculty,
        loading,
        OWNER_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
