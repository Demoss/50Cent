import { Route, Routes } from 'react-router-dom';

import { CreditPage } from './Credit.page';
import { CreateScreen } from './CreateScreen';
import { GetScreen } from './GetScreen';

export function CreditRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreditPage />}>
        <Route index element={<CreateScreen />} />
        <Route path="get/:id">
          <Route index element={<GetScreen />} />
        </Route>
      </Route>
    </Routes>
  );
}
