import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';

export interface ProtectedRouteProps {
  onlyAdmin: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const user = useCurrentUser();
  const navigate = useNavigate();

  if (user.isLoading) {
    return <Spin>loading</Spin>;
  }

  if (
    props.onlyAdmin &&
    user.currentUser &&
    user.currentUser.role !== 'admin'
  ) {
    message.error("You don't have access to this page", 10, () => {
      navigate(-1);
    });
  }

  return user.currentUser !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  );
};

export default ProtectedRoute;
