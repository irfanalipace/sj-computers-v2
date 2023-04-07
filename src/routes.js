import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@pages/Home/Home";
import EmailForm from "@pages/Auth/LoginForms/EmailForm";
import PasswordForm from "@pages/Auth/LoginForms/PasswordForm";
import VerifyOTP from "@pages/Auth/LoginForms/VerifyOTP";
import Register from "@pages/Auth/RegisterForms/Register";
import EmailVerify from "@pages/Auth/RegisterForms/EmailVerify";
import Profile from "@pages/User/Profile";
import ForgetPassword from "@pages/Auth/ForgetPassword/ForgetPassword";

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
            path: "/verify-email",
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
            path: "/verify-email",
            element: (
                <AuthRoute>
                    <EmailVerify />
                </AuthRoute>
            ),
        },
        {
            path: "/forget-password",
            element: (
                <AuthRoute>
                    <ForgetPassword />
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
