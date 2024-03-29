import styled from 'styled-components';

export const InvestorHeader = styled.div`
  padding: 0 100px;
`;
export const InvestorTable = styled.div`
  padding: 0 100px;
  margin: 10px 0 20px;
`;

export const BalanceTitle = styled.div`
  font-size: 1.1rem;
`;

export const BalanceContainer = styled.div`
  font-size: 1.3rem;
`;

export const InvestorInfo = styled.div`
  text-align: center;
  letter-spacing: 1px;
  font-size: 1.3rem;
  padding-top: 20px;
`;

export const StripeInfo = styled.p`
  text-align: center;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transform: translateY(35%);
`;

export const StripeInfoSuccess = styled.span`
  color: var(--link-button);
`;

export const StripeInfoError = styled.span`
  color: var(--red-button);
`;
