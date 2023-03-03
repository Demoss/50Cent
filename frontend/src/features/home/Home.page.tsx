import { Layout } from 'antd';

import './Home.css';

export function HomePage() {
  return (
    <Layout style={{minHeight: "700px", position: "relative", overflow:'hidden'}}>
        <div className="ternary-system">
            <div className="sun primary"></div>
            <div className="sun secondary"></div>
            <div className="sun ternary"></div>
        </div>
        <div className="sand">
            <div className="pendulums">
                <div className="pendulum">
                    <div className="bar"></div>
                    <div className="motion">
                        <div className="string"></div>
                        <div className="weight"></div>
                    </div>
                </div>
                <div className="pendulum shadow">
                    <div className="bar"></div>
                    <div className="motion">
                        <div className="string"></div>
                        <div className="weight"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pyramid"></div>
        <div className="text">
            <h1 className="title">The <strong>50 cent </strong></h1>
            <p> application is the service where you can lend or borrow
                amount of money without visiting any banks.</p>
        </div>
    </Layout>
  );
}
