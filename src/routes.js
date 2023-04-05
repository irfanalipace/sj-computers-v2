import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@pages/Home/Home";
import Login from "@pages/Auth/Login";
import VerifyOTP from "@pages/Auth/VerifyOTP";

import Register from "@pages/Auth/Register";
import Profile from "@pages/User/Profile";

export const Router = () => {
    const routes = [
        {
            path: "/",
            element: <Home />,
            // element: (
            //     <AuthRoute>
            //         <Login />
            //     </AuthRoute>
            // ),
        },
        {
            path: "/login",
            element: (
                <AuthRoute>
                    <Login />
                </AuthRoute>
            ),
        },
        {
            path: "/register",
            element: (
                <AuthRoute>
                    <Register />
                </AuthRoute>
            ),
        },
        // {
        //     path: "/otp-option",
        //     element: (
        //         <AuthRoute>
        //             <Login />
        //         </AuthRoute>
        //     ),
        // },
        {
            path: "/verify-otp",
            element: (
                <AuthRoute>
                    <VerifyOTP />
                </AuthRoute>
            ),
        },
        {
            path: "/forget-password",
            element: (
                <AuthRoute>
                    <Login />
                </AuthRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
    ];

    const router = useRoutes(routes);

    return router;
};

export function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export function AuthRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? <Navigate to="/" replace /> : children;
}
