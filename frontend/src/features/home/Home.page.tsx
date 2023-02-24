import { Layout } from 'antd';
import HeroLogo from '../../images/hero_logo.png';

import { BgImgContainer, HomeHero } from './Home.styles';

export function HomePage() {
  return (
    <Layout>
      <BgImgContainer>
        <HomeHero>
          <span>
            {/* 50¢ */}
            <img
              src={HeroLogo}
              alt=""
              style={{ opacity: '0.9', width: '690px' }}
            />
          </span>
          <br />
          <span
            style={{ color: '#3c4364', fontFamily: 'emoji', fontSize: '124px' }}
          >
            make money work
          </span>
        </HomeHero>
        <span
          style={{
            marginLeft: '150px',
            fontSize: '26px',
            color: '#120d00',
          }}
        >
          The 50 cent application is the service where you can lend or borrow
          amount of money without visiting any banks.
        </span>
      </BgImgContainer>
    </Layout>
  );
}
