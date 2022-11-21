import { GetApiFunc, makeEndpoint } from '../base';
import { registerInvestorForm } from './registerInvestorForm/registerInvestorForm';
import { getInvestorInfo } from './GetInvestorInfo/getInvestorInfo';
import { updateInvestor } from './UpdateInvestor/UpdateInvestor';
import { getCurrentInvestor } from './GetCurrentInvestor/getCurrentInvestor';
import { getPotentialPayout } from './GetPotentialPayout/getPotentialPayout';

import { registerInvestorStripe } from './RegisterInvestorStripe/registerInvestorStripe';

export function createInvestorApi(getApi: GetApiFunc) {
  return {
    registerInvestorForm: makeEndpoint(registerInvestorForm, getApi),
    getInvestorInfo: makeEndpoint(getInvestorInfo, getApi),
    updateInvestor: makeEndpoint(updateInvestor, getApi),
    getCurrentInvestor: makeEndpoint(getCurrentInvestor, getApi),
    getPotentialPayout: makeEndpoint(getPotentialPayout, getApi),
    registerInvestorStripe: makeEndpoint(registerInvestorStripe, getApi),
  };
}
