import { Navigate, Route, Routes } from 'react-router-dom';
import { InvestorPage } from './Investor.page';
import { InvestorCabinetScreen } from './InvestorCabinetScreen';
import { InvestorDataFormScreen } from '@/features/investor/InvestorDataFormScreen';
import { InvestorScreen } from './InvestorScreen';
import { InvestorUpdateDataFormScreen } from './InvestorUpdateDataFormScreen';

export function InvestorRoutes() {
  return (
    <Routes>
      <Route path="" element={<InvestorPage />}>
        <Route index element={<InvestorScreen />} />
        <Route path="registration" element={<InvestorDataFormScreen />} />
        <Route path="cabinet" element={<InvestorCabinetScreen />} />
        <Route path="update/:id" element={<InvestorUpdateDataFormScreen />} />
        <Route path="*" element={<Navigate to="obtain" replace />} />
      </Route>
    </Routes>
  );
}
