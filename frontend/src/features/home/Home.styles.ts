import styled from 'styled-components';
import HomeBgImg from '../../images/home_bg.jpg';

export const BgImgContainer = styled.div`
  background-image: url(${HomeBgImg});
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.7;
  height: 750px;
`;

export const HomeHero = styled.div`
  font-size: 100px;
  padding-left: 225px;
  padding-top: 150px;
`;
