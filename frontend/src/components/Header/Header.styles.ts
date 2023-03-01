import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyles = {
  ImgContainer: styled.img`
    width: 100%;
    max-width: 100px;
  `,
  UserTypeContainer: styled.span`
    border: 1px solid lightgrey;
    font-weight: 400;
    padding: 6px 15px;
    font-size: 14px;
  `,
  LogoHomeButton: styled.button`
    height: 50px;
    background: none;
    border: 0;
    &:hover {
      cursor: pointer;
    }
  `,
  NavLinkCabinetStyled: styled(NavLink)`
    background-color: var(--header-color);
    color: var(--footer-color);
    letter-spacing: 1px;
    // text-transform: uppercase;
    padding: 5px 3px;
  `,
};
