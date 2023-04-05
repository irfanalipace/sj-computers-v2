import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@pages/Home/Home";
import Login from "@pages/Auth/Login";
import Profile from "@pages/User/Profile";
import Register from "./views/pages/Auth/Register";

export const Router = () => {
    const routes = [
        {
            path: "/",
            element: (
                <AuthRoute>
                    <Login />
                </AuthRoute>
            ),
        },
        {
            path: "/Register",
            element: <Register />,
          
        },
        {
            path: "/Home",
            element: <Home />,
          
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
