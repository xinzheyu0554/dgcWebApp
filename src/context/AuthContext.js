import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, jsonBody } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const result = await api("/auth/me");
      setUser(result.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (email, password) => {
    const result = await api("/auth/login", {
      method: "POST", body: jsonBody({ email, password }),
    });
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try { await api("/auth/logout", { method: "POST" }); }
    finally { setUser(null); }
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout, refresh }), [user, loading, login, logout, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
