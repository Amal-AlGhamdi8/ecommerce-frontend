import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

const Footer = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.users)

  return (
    <>
      {!isLoggedIn && (
        <div>
          <footer>
            <div className="logo-nav navbar">
              <ul className="menu">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>|</li>
                <li>
                  <a href="#products">Products</a>
                </li>
                <li>|</li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>|</li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="contact-info" id="contact">
              <p>TECHNO Company- 368 King Abdulaziz Street, Jeddah, SA</p>
            </div>
            <div className="social-links">
              <div className="link">
                <a href="https://github.com/" aria-label="GitHub">
                  <i className="fa fa-github"></i>
                </a>
              </div>
              <div className="link">
                <a href="#" aria-label="Instagram">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
              <div className="link">
                <a href="#" aria-label="Whatsapp">
                  <i className="fa fa-whatsapp"></i>
                </a>
              </div>
              <div className="link">
                <a href="#" aria-label="Whatsapp">
                  <i className="fa fa-mail"></i>
                </a>
              </div>
            </div>
            <div className="copyright">
              <p>&copy; Copyright, 2023 - TECHNO Company</p>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}

export default Footer
