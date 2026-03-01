import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();
const OWNER_EMAIL = "atul.sharmas2806@gmail.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user || null;

      setUser(currentUser);

      if (currentUser) {
        if (currentUser.email === OWNER_EMAIL) {
          setRole("owner");
        } else {
          setRole("faculty");
        }
      }

      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          if (currentUser.email === OWNER_EMAIL) {
            setRole("owner");
          } else {
            setRole("faculty");
          }
        } else {
          setRole(null);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return error;
  };

  const createFaculty = async (email, password) => {
    if (user?.email !== OWNER_EMAIL) {
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
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
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
