import styled from 'styled-components';

export const RedButton = styled.div`
  background-color: var(--red-button);
  width: 100%;
  height: 50px;
  color: white;
  border: 1px solid #ff4d4f;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
  border-radius: 10px;
  transition-duration: 0.2s;
  &:hover {
    box-shadow: 0px 0px 10px rgba(255, 77, 79, 1);
  }
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ButtonText = styled.text`
  font-size: 24px;
  font-weight: 500;
`;

export const MainTitle = styled.h2`
  text-align: center;
  font-size: 38px;
  margin-bottom: 10vh;
`;

export const PageSubTitle = styled.h2`
  font-size: 32px;
  margin-right: 30px;
`;

export const ButtonsContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;
