import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login } from '../../services/userService';

export default function AuthRoute({ children }) {
  
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${login}`} replace />
  );
}