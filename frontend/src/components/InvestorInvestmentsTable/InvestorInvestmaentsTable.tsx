import { FC } from 'react';
import { Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import { InvestorLoanWithKeys } from '@/api/credit/getInvestorCredits/apiTypes';
import { useInvestorCredits } from '@/hooks/credits/useInvestorCredits';

const columns: ColumnsType<Omit<InvestorLoanWithKeys, 'ID'>> = [
  {
    title: 'Loan',
    dataIndex: 'CreditSum',
    key: 'CreditSum',
    width: '25%',
    render: (_, el) => (
      <>
        $ {el.CreditSum} - {el.CreditTitle}
      </>
    ),
  },
  {
    title: 'Consumer',
    dataIndex: 'ConsumerName',
    key: 'ConsumerName',
    width: '25%',
    render: (_, el) => (
      <>
        {el.ConsumerName} {el.ConsumerSurname}
      </>
    ),
  },
  {
    title: 'Paid',
    dataIndex: 'ReturnedAmount',
    key: 'ReturnedAmount',
    width: '30%',
    render: (_, { ReturnedAmount }) => <Progress percent={ReturnedAmount} />,
  },
  {
    title: 'Date of final payment',
    dataIndex: 'LatestPaymount',
    key: 'LatestPaymount',
    width: '20%',
    render: (_, { LatestPaymount }) => (
      <span style={{ marginLeft: '15px' }}>{LatestPaymount}</span>
    ),
  },
];

const InvestorInvestmentsTable: FC = () => {
  const { data } = useInvestorCredits();

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 280 }}
    />
  );
};

export { InvestorInvestmentsTable };
