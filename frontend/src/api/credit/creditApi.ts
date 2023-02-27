import { GetApiFunc, makeEndpoint } from '../base';
import { createCredit } from '@/api/credit/createCredit';
import { getCredit } from '@/api/credit/getCredit/getCredit';
import { getStripeURL } from '@/api/credit/getStripeURL/getURL';
import { makeCounterOffer } from '@/api/credit/makeCounterOffer/makeCounterOffer';
import { getAllCredits } from './getCredits';
import { getAllInvestorCredits } from './getInvestorCredits';
import { getCreditWithConsumer } from '@/api/credit/getCreditWithConsumer/getCreditWithConsumer';

export function createCreditApi(getApi: GetApiFunc) {
  return {
    createCredit: makeEndpoint(createCredit, getApi),
    getCredit: makeEndpoint(getCredit, getApi),
    getCreditWithConsumer: makeEndpoint(getCreditWithConsumer, getApi),
    getStripeURL: makeEndpoint(getStripeURL, getApi),
    getAllCredits: makeEndpoint(getAllCredits, getApi),
    makeCounterOffer: makeEndpoint(makeCounterOffer, getApi),
    getAllInvestorCredits: makeEndpoint(getAllInvestorCredits, getApi),
  };
}
