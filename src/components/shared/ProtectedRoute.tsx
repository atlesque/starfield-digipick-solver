import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const [user] = useAuthState(getAuth());

  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
