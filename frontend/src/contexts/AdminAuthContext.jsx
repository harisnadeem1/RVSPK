import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function AdminAuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ── Silent logout (token expired or invalid) ──────────────
  const silentLogout = useCallback(() => {
    setIsAdminAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  }, [navigate]);

  // ── Verify token on app load ───────────────────────────────
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          // Token expired or invalid — silent logout
          silentLogout();
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setAdmin(data.user);
          setIsAdminAuthenticated(true);
        }
      } catch (err) {
        console.error('Session verify error:', err);
        silentLogout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [silentLogout]);

  // ── Login ─────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      setAdmin(data.user);
      setIsAdminAuthenticated(true);

      return { success: true, role: data.user.role };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Unable to connect to server' };
    }
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      // Even if API call fails, clear local session
      console.error('Logout API error:', err);
    } finally {
      silentLogout();
    }
  };

  // ── Auto-logout on token expiry via response interceptor ──
  // Call this wrapper instead of raw fetch anywhere in the app
  const authFetch = useCallback(async (url, options = {}) => {
    const token = localStorage.getItem('adminToken');

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401 || res.status === 403) {
      silentLogout();
      return null;
    }

    return res;
  }, [silentLogout]);

  const value = {
    isAdminAuthenticated,
    isLoading,
    admin,                  // { id, email, role, full_name }
    login,
    logout,
    authFetch,              // use this for all protected API calls
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}