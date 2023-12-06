import { Link } from 'react-router-dom'

import aboutImage from '../../images/win.png'

const Main = () => {
  const heroStyles = {
    background: 'url(../src/images/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    textAlign: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const styledHero = heroStyles as React.CSSProperties

  return (
    <div style={{ minHeight: '100%' }}>
      <main>
        <section className="hero" id="hero" style={styledHero}>
          <h1>Welcome to TECHNO Company</h1>
          <p>Your Trusted Source for High-Quality Sales Devices</p>
          <Link className="btn-button btn-grad" to="/categories">
            Get Started{' '}
          </Link>
        </section>
        <section className="about" id="about">
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              We are a leading provider of high-quality electronic devices. With a focus on
              innovation and customer satisfaction, we offer a wide range of products to meet your
              needs. Whether you are looking for cutting-edge technology or reliable solutions, we
              have you covered.
            </p>
            <p>
              Our dedicated team is committed to helping you find the right devices for your
              business or personal use.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="About Us Image" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Main
