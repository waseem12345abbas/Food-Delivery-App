// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const tokenRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  tokenRef.current = accessToken;

  // Attach Authorization header on every request
  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
      const token = tokenRef.current;
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Auto refresh on 401 once, queue concurrent requests
    let isRefreshing = false;
    const queue = [];
    const resolveQueue = (newToken) => {
      queue.splice(0).forEach(({ resolve, config }) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(api(config));
      });
    };
    const rejectQueue = (err) => {
      queue.splice(0).forEach(({ reject }) => reject(err));
    };

    const resId = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;
        const original = error.config;

        if (status === 401 && !original._retry) {
          original._retry = true;

          // Check if user is a guest - if so, don't try to refresh token
          const userType = sessionStorage.getItem("userType");
          const isGuestUser = userType === "guest";

          if (isGuestUser) {
            // For guest users, don't try to refresh token, just reject the request
            return Promise.reject(error);
          }

          // queue the original request
          const promise = new Promise((resolve, reject) => {
            queue.push({ resolve, reject, config: original });
          });

          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const r = await api.get('/api/refresh-token'); // uses cookie
              setAccessToken(r.data.accessToken);
              setUser((u) => u || r.data.user);
              isRefreshing = false;
              resolveQueue(r.data.accessToken);
            } catch (e) {
              isRefreshing = false;
              rejectQueue(e);
              setUser(null);
              setAccessToken(null);
              setLoading(true)
              // Store current location before redirecting to login
              const currentPath = location.pathname + location.search;
              sessionStorage.setItem("redirectAfterLogin", currentPath);
              navigate('/login', { replace: true });
            }
          }
          return promise;
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [navigate]);

  // Bootstrap session on first load (re-hydrate from refresh cookie)
  useEffect(() => {
    (async () => {
      try {
        const r = await api.get('/api/refresh-token');
        setAccessToken(r.data.accessToken);
        setUser(r.data.user);
      } catch(error) {
        console.error("Session bootstrap failed:", error);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Public API
  const login = async (credentials) => {
    const r = await api.post('/api/login', credentials);
    setAccessToken(r.data.accessToken);
    setUser(r.data.user);
    // Sync token to localStorage for consistency
    localStorage.setItem("token", r.data.accessToken);
    return r.data;
  };
  const logout = async () => {
    await api.post('/api/logout');
    setAccessToken(null);
    setUser(null);
  };
   if (loading) {
    return <p className="text-center mt-10">Loading session...</p>;
  }
  const value = { user, accessToken, isAuthed: !!user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
