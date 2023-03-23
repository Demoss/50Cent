import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { appStorage } from '@/services/appStorage';
import { Api } from '@/api';
import { LoginConfirmToken } from '@/features/login/LoginConfirmScreen/LoginConfirmScreen.types';
import jwt_decode from 'jwt-decode';

export interface ProtectedRouteProps {
  onlyAdmin: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  (async () => {
    const expirationToken = (await appStorage.getApiExpiration()) || '';
    const token = Number(expirationToken);
    if (token <= Date.now()) {
      const refresh = (await appStorage.getApiRefresh()) || '';
      const resp = await Api.refresh({ refresh_token: refresh });
      await appStorage.setApiKey(resp.token);
      await appStorage.setRefreshToken(resp.refresh);
      const token: LoginConfirmToken = jwt_decode(resp.token);
      await appStorage.setExpirationTimeApiKey(token.exp);
    }
  })();

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
