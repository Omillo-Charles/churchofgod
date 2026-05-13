import { useState, useEffect } from "react";

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  role?: string;
}

/**
 * Checks whether the current user has a valid session by calling the
 * /api/auth/me Next.js route, which reads the httpOnly JWT cookie server-side.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ authenticated: false, loading: true });

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setState({ authenticated: true, loading: false, role: data.user?.role });
        } else {
          setState({ authenticated: false, loading: false });
        }
      })
      .catch(() => setState({ authenticated: false, loading: false }));
  }, []);

  return state;
}
