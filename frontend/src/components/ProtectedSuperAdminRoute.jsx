import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';

function ProtectedSuperAdminRoute({ children }) {
  const { isAdminAuthenticated, isLoading, admin } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin?.role !== 'super_admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedSuperAdminRoute;