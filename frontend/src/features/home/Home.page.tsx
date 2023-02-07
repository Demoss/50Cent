import { Layout } from 'antd';
import HeroLogo from '../../images/hero_logo.png';

import { BgImgContainer, HomeHero } from './Home.styles';

export function HomePage() {
  return (
    <Layout>
      <BgImgContainer>
        <HomeHero>
          <span>
            <img
              src={HeroLogo}
              alt=""
              style={{ opacity: '0.7', width: '500px' }}
            />
          </span>
          <br />
          <span style={{ color: 'tan', fontFamily: 'emoji' }}>
            make money work
          </span>
        </HomeHero>
        <span
          style={{
            textAlign: 'center',
            marginLeft: '150px',
            fontSize: '24px',
            color: 'darkgoldenrod',
          }}
        >
          The 50 cent application is the service where you can lend or borrow
          amount of money without visiting any banks.
        </span>
      </BgImgContainer>
    </Layout>
  );
}
