import { createContext, useState, useEffect, useContext } from "react";
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

  const ensureProfileRole = async (currentUser, fallbackRole) => {
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
  };

  const resolveRole = async (currentUser) => {
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
      setRole(fallbackRole);
      setProfileReady(false);
      setProfileMissing(true);
      return fallbackRole;
    }

    if (profile?.role) {
      setRole(profile.role);
      setProfileReady(true);
      setProfileMissing(false);
      return profile.role;
    }

    const bootstrapped = await ensureProfileRole(currentUser, fallbackRole);

    if (bootstrapped && fallbackRole) {
      setRole(fallbackRole);
      setProfileReady(true);
      setProfileMissing(false);
      return fallbackRole;
    }

    setRole(fallbackRole);
    setProfileReady(Boolean(fallbackRole));
    setProfileMissing(true);
    return fallbackRole;
  };

  const resolveRoleInBackground = (currentUser) => {
    resolveRole(currentUser).catch((error) => {
      console.error("Role resolution failed:", error);
    });
  };

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
  }, []);

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
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return error;

    // Restore owner session immediately
    if (ownerSession) {
      await supabase.auth.setSession(ownerSession);
    }

    return null;
  };

  const logout = async () => {
    clearLocalAuthState();

    const signOutPromise = supabase.auth.signOut({ scope: "local" });
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve({ error: null }), 1500),
    );
    const result = await Promise.race([signOutPromise, timeoutPromise]);
    const error = result?.error || null;

    if (error) {
      console.error("Logout failed:", error);
    }

    clearLocalAuthState();
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

export const useAuth = () => useContext(AuthContext);
