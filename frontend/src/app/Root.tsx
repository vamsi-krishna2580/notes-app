import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from './lib/auth-context';
import { Toaster } from 'sonner';

export function Root() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect logic
  const isAuthPage = location.pathname === '/auth';
  
  if (!user && !isAuthPage) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user && isAuthPage) {
    return <Navigate to="/todos" replace />;
  }

  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}
