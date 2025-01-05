import {Outlet, Navigate} from 'react-router-dom';

const PrivateRoutes=() => {
const loggedIn = localStorage.getItem("loggedIn");
    return(
      loggedIn?<Outlet/>:<Navigate to="/login"/>
    )
}

export default PrivateRoutes