import { useState, useEffect } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  user?: User;
}

/**
 * Checks whether the current user has a valid session by calling the
 * /api/auth/me Next.js route, which reads the httpOnly JWT cookie server-side.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ authenticated: false, loading: true });

  useEffect(() => {
    // We call the backend directly since it has the credentials (cookies)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1";
    
    fetch(`${apiUrl}/users/me`, { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          setState({ authenticated: true, loading: false, user: result.data });
        } else {
          setState({ authenticated: false, loading: false });
        }
      })
      .catch(() => setState({ authenticated: false, loading: false }));
  }, []);

  return state;
}
