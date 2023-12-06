import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart' 
import { Badge } from '@mui/material'

import logo from '../../images/Techno.png'
import { CartState } from '../../redux/slices/cart/cartSlice'

const Header = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart)
  const navigate = useNavigate()

  // Calculate the total number of products in the cart
  const totalProductsInCart = cart.cart.reduce((total, cartItem) => total + cartItem.quantity, 0)

  return (
    <>
      <div>
        <header id="header">
          <nav role="navigation" aria-label="Main Navigation">
            <div className="logo-nav navbar">
              <img src={logo} className="logo" alt="Techno Logo" />
              <ul className="menu">
                <>
                  <li>
                    <Link to="/main">Home</Link>
                  </li>
                  <li>|</li>
                  <li>
                    <Link to="/categories">Products</Link>
                  </li>
                  <li>|</li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>|</li>
                  <li>
                    <Link to="/UserCart">
                      <Badge badgeContent={totalProductsInCart} color="secondary">
                        <ShoppingCartIcon />
                      </Badge>
                    </Link>
                  </li>
                  <li>|</li>

                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

export default Header
