import AuthService from '../services/auth.ts'
import ErrorPage from '../pages/ErrorPage.tsx';

import { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const token = AuthService.getToken();
    const userId = AuthService.getUserId();
    const isAdmin = AuthService.isAdmin();
   
    if (!token || !userId) {
      return <ErrorPage />;
    }

  return isAdmin ? <>{children}</> : <ErrorPage />;
};

export default AdminRoute;
