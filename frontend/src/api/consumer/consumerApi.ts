import { GetApiFunc, makeEndpoint } from '@/api/base';
import { acceptOffer } from './accepetCounterOffer/acceptOffer';
import { getAcceptedLoans } from './acceptedLoans/getAcceptedLoans';
import { create } from './create/create';
import { getCounterOffers } from './getCounterOffers/getCounterOffers';
import { getRepayStripeUrl } from './getRepayStripeUrl/getRepayUrl';
import { rejectOffer } from './rejectOffer/rejectOffer';
import { updateConsumer } from './UpdateConsumer/UpdateConsumer';
import { getConsumerInfo } from './GetConsumerInfo/getConsumerInfo';
import { getCurrentConsumer } from './GetCurrentConsumer/getCurrentConsumer';
import { registerStripe } from './RegisterStripe/registerStripe';

export function createConsumerApi(getApi: GetApiFunc) {
  return {
    create: makeEndpoint(create, getApi),
    updateConsumer: makeEndpoint(updateConsumer, getApi),
    getConsumerInfo: makeEndpoint(getConsumerInfo, getApi),
    registerStripe: makeEndpoint(registerStripe, getApi),
    getCurrentConsumer: makeEndpoint(getCurrentConsumer, getApi),
  };
}
export function createAcceptedLoanApi(getApi: GetApiFunc) {
  return {
    getAcceptedLoans: makeEndpoint(getAcceptedLoans, getApi),
    getRepayStripeUrl: makeEndpoint(getRepayStripeUrl, getApi),
  };
}

export function createCounterOffersApi(getApi: GetApiFunc) {
  return {
    getCounterOffers: makeEndpoint(getCounterOffers, getApi),
    acceptCounterOffer: makeEndpoint(acceptOffer, getApi),
    rejectCounterOffer: makeEndpoint(rejectOffer, getApi),
  };
}
