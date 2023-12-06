import { BrowserRouter, Route, Routes } from 'react-router-dom'

import UserDashboard from '../pages/users/UserDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'

import Main from '../components/Home/Main'
import Footer from '../components/Home/Footer'

import About from '../pages/Home/About'
import Login from '../pages/Home/Login'
import Register from '../pages/Home/Register'
import Products from '../pages/Home/Products'
import Home from '../pages/Home/Home'
import ProductDetails from '../pages/Home/ProductDetails'
import Categories from '../pages/Home/Categories'

import AdminRoute from './AdminRouter'
import UserRoute from './UserRouter'

import ManageProducts from '../pages/admin/ManageProducts'
import ManageOrders from '../pages/admin/ManageOrders'

import UserProfile from '../pages/users/UserProfile'
import UserCart from '../pages/users/UserCart'
import ManageUsers from '../pages/admin/ManageUsers'

import Error from '../pages/Error'
import ProductsByCategory from '../pages/Home/ProductsByCategory'
import Manage from '../pages/admin/Manage'
import ManageCategories from '../pages/admin/ManageCategories'
import Nav from '../components/Nav'

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/category/:categoryId" element={<ProductsByCategory />} />
            <Route path="/UserCart" element={<UserCart />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login pathName={''} />} />

            <Route path="/" element={<UserRoute />}>
              <Route path="/dashboard/visitor" element={<UserDashboard />} />
              <Route path="/dashboard/visitor/UserProfile" element={<UserProfile />} />
            </Route>

            <Route path="/" element={<AdminRoute />}>
              <Route path="/dashboard/Admin" element={<AdminDashboard />} />
              <Route path="/dashboard/Admin/Manage" element={<Manage />} />
              <Route path="/dashboard/Admin/ManageProducts" element={<ManageProducts />} />
              <Route path="/dashboard/Admin/ManageCategories" element={<ManageCategories />} />
              <Route path="/dashboard/Admin/ManageOrders" element={<ManageOrders />} />
              <Route path="/dashboard/Admin/ManageUsers" element={<ManageUsers />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </Nav>
        <Footer />

      </BrowserRouter>
    </div>
  )
}

export default Routers
