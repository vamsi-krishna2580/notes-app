import { Navigate } from 'react-router';

export function RedirectToTodos() {
  return <Navigate to="/todos" replace />;
}
