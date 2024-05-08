import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = JSON.parse(localStorage.getItem("token"));
    return(
        auth ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes