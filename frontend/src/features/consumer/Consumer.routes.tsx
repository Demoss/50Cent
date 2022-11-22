import { Route, Routes } from 'react-router-dom';

import { ConsumerPage } from './Consumer.page';
import { CreateScreen } from '../consumer/CreateScreen/CreateScreen.component';
import { ConsumerScreen } from './ConsumerScreen';
import { ConsumerUpdateDataFormScreen } from './ConsumerUpdateDataFormScreen';

export function ConsumerRoutes() {
  return (
    <Routes>
      <Route path="" element={<ConsumerPage />}>
        <Route index element={<CreateScreen />} />
        <Route path="cabinet" element={<ConsumerScreen />} />
        <Route path="registration" element={<CreateScreen />} />
        <Route path="update/:id" element={<ConsumerUpdateDataFormScreen />} />
      </Route>
    </Routes>
  );
}
