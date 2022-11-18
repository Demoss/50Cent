import { FC, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import { EstimateContainer } from './InvestmentsTable.styles';
import { useAllCredits } from '@/hooks/credits';
import { LoanWithKeys } from '@/api/credit/getCredits/apiTypes';

const columns: ColumnsType<Omit<LoanWithKeys, 'ID'>> = [
  {
    title: 'Required amount and rate',
    dataIndex: 'CreditSum',
    key: 'CreditSum',
    width: '20%',
    render: (_, el) => (
      <>
        {el.CreditSum} with {el.CreditRate}%
      </>
    ),
  },
  {
    title: 'Term of the loan',
    dataIndex: 'creditTerm',
    key: 'CreditTerm',
    width: '15%',
    render: (term) => <>{term} months</>,
  },
  {
    title: 'Borrower rate',
    dataIndex: 'CreditRate',
    key: 'CreditRate',
    defaultSortOrder: 'descend',
    width: '10%',
    sorter: (a, b) => a.CreditRate - b.CreditRate,
    render: (_, { CreditRate }) => (
      <EstimateContainer estimate={CreditRate}>{CreditRate}</EstimateContainer>
    ),
  },
  {
    title: 'What wil be the money used for?',
    dataIndex: 'CreditTitle',
    key: 'CreditTitle',
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'CreditDesc',
    key: 'CreditDesc',
    sortDirections: ['descend'],
    width: '25%',
  },
  {
    title: 'Action',
    dataIndex: 'CreditAction',
    key: 'CreditAction',
    width: '10%',
    render: (text) => <a href={'/'}>{text}</a>,
  },
];

const InvestmentsTable: FC = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    position: ['bottomCenter'],
  });

  const { totalPages, loans } = useAllCredits(pagination);

  return (
    <Table
      columns={columns}
      dataSource={loans}
      pagination={{
        ...pagination,
        total:
          totalPages && pagination.pageSize
            ? pagination.pageSize * totalPages
            : 1,
        onChange: (page) => {
          setPagination({
            ...pagination,
            current: page,
          });
        },
      }}
    />
  );
};

export { InvestmentsTable };
