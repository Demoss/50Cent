import { Route, Routes } from 'react-router-dom';

import { InvestorRoutes } from '@/features/investor/Investor.routes';
import { routes } from './routes';
import { LayoutComponent } from '@/components';
import { HomePage } from '@/features/home';
import { ObtainRoutes } from '@/features/obtain';
import { ConsumerRoutes } from '@/features/consumer';

import { AdminRoutes } from '@/features/admin/Admin.routes';
import { CreditRoutes } from '@/features/credit';
import ProtectedRoute from '@/routing/protected.Routes';
import { LoginRoutes } from '@/features/login/Login.routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={''} element={<LayoutComponent />}>
        <Route index element={<HomePage />} />
        <Route
          path={`${routes.login.absolute()}/*`}
          element={<LoginRoutes />}
        />

        <Route path={`${routes.admin.absolute()}`} element={<AdminRoutes />} />

        <Route
          path={`${routes.investor.absolute()}/*`}
          element={<InvestorRoutes />}
        />

        <Route element={<ProtectedRoute onlyAdmin={false} />}>
          <Route
            path={`${routes.credit.absolute()}/*`}
            element={<CreditRoutes />}
          />
        </Route>

        <Route element={<ProtectedRoute onlyAdmin={false} />}>
          <Route
            path={`${routes.obtain.absolute()}/*`}
            element={<ObtainRoutes />}
          />
        </Route>

        <Route element={<ProtectedRoute onlyAdmin={true} />}>
          <Route
            path={`${routes.admin.absolute()}`}
            element={<AdminRoutes />}
          />
        </Route>

        <Route
          path={`${routes.obtain.absolute()}/*`}
          element={<ObtainRoutes />}
        />

        <Route element={<ProtectedRoute onlyAdmin={false} />}>
          <Route
            path={`${routes.consumer.absolute()}/*`}
            element={<ConsumerRoutes />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
