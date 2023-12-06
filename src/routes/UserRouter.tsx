import { Outlet, useLocation } from "react-router-dom"

import { Login } from "../pages/Home/Login"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"


const UserRoute = () => {
    const location=useLocation()
    const {isLoggedIn }= useSelector((state:RootState) => state.users)

    return isLoggedIn ? <Outlet/>: <Login pathName={location.pathname}/>  
}
export default UserRoute