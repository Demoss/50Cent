import { FC, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';

import { useAllCredits } from '@/hooks/credits';
import { LoanWithKeys } from '@/api/credit/getCredits/apiTypes';

const columns: ColumnsType<Omit<LoanWithKeys, 'ID'>> = [
  {
    title: 'Required amount and rate',
    dataIndex: 'CreditSum',
    key: 'CreditSum',
    width: '25%',
    render: (_, el) => (
      <>

        ${Math.round(el.CreditSum)} at a {el.CreditRate}%

      </>
    ),
  },
  {

    title: 'Term of the loan',
    dataIndex: 'СreditTerm',
    key: 'CreditTerm',
    width: '15%',
    render: (_, el) => <>{el.CreditTerm} місяців</>,

  },
  {
    title: 'What wil be the money used for?',
    dataIndex: 'CreditTitle',
    key: 'CreditTitle',
    width: '20%',
    render: (CreditTitle) => <>{CreditTitle}</>,
  },
  {

    title: 'Description',
    dataIndex: 'CreditDescription',
    key: 'CreditDescription',

    sortDirections: ['descend'],
    width: '30%',
    sorter: (a, b) => a.CreditDescription.length - b.CreditDescription.length,
  },
  {

    title: 'Action',
    dataIndex: 'CreditID',
    key: 'CreditID',
    width: '10%',
    render: (CreditID) => (
      <Link to={`/credit/get/${CreditID}`}>Детальніше</Link>
    ),
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
