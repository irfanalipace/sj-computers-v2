import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@pages/Home/Home";
import EmailForm from "@pages/Auth/LoginForms/EmailForm";
import PasswordForm from "@pages/Auth/LoginForms/PasswordForm";
import VerifyOTP from "@pages/Auth/LoginForms/VerifyOTP";
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
                    <EmailForm />
                </AuthRoute>
            ),
        },
        {
            path: "/verify-password",
            element: (
                <AuthRoute>
                    <PasswordForm />
                </AuthRoute>
            ),
        },
        {
            path: "/verify-otp",
            element: (
                <AuthRoute>
                    <VerifyOTP />
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
        {
            path: "/forget-password",
            element: (
                <AuthRoute>
                    <Register />
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
