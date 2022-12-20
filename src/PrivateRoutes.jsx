import React, {useContext} from "react";
import {Outlet, Navigate, Router} from "react-router-dom";
import {AuthContext} from "./Auth";

const PrivateRoutes = () => {
    const {currentUser} = useContext(AuthContext);  
    return (
        !!currentUser ? <Outlet/> : <Navigate replace to="/login" /> 
    )
}

export default PrivateRoutes;


{/* <Router>
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Navigate replace to="/login" />
                )
            }
        />
        </Router> */}