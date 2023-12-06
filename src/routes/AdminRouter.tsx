
import { Outlet, useLocation } from "react-router-dom"
import { Login } from "../pages/Home/Login"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


const AdminRoute = () => {

    const {isLoggedIn ,userData}= useSelector((state:RootState) => state.users)
     const location=useLocation()

    return isLoggedIn && userData?.role ==='admin'?
     <Outlet/>:<Login pathName={location.pathname}/>

}
export default AdminRoute