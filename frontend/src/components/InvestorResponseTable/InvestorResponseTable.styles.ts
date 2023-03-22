import styled, { css } from 'styled-components';

export const EstimateContainer = styled.span<{ estimate: number }>`
  ${(props) =>
    props.estimate <= 50
      ? css`
          background-color: rgb(234, 129, 129);
          width: 65px;
          color: rgb(200, 2, 2);
          border: 1px solid red;
          padding: 3px 5px;
        `
      : props.estimate <= 70
      ? css`
          background-color: rgb(255, 255, 0);
          width: 65px;
          color: rgb(151, 151, 5);
          border: 1px solid rgb(151, 151, 5);
          padding: 3px 5px;
        `
      : css`
          background-color: lightgreen;
          width: 65px;
          color: darkgreen;
          border: 1px solid darkgreen;
          padding: 3px 5px;
        `}

  .ant-table .ant-table-container .ant-table-content table thead.ant-table-thead {
    background-color: green !important;
  }
`;

export const ActionBtn = styled.button;
