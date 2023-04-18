import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@pages/Home/Home";
import LoginForm from "@pages/Auth/LoginForm";
import Register from "@pages/Auth/Register";
import Profile from "@pages/User/Profile";
import ForgetPassword from "@pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "@pages/Auth/ForgetPassword/ResetPassword";
import Emailsent from "@pages/Auth/EmailSent";
import Product from "@pages/Product/Product";
import Category from "@pages/Category/Category";
import Cart from "@components/ShoppingCart/Cart";
import Checkout from "@pages/Checkout/Checkout";

export const Router = () => {
    const routes = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthRoute>
                    <LoginForm />
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
            path: "/email-sent",
            element: (
                <AuthRoute>
                    <Emailsent />
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
            path: "/forgot_password",
            element: (
                <AuthRoute>
                    <ResetPassword />
                </AuthRoute>
            ),
        },
        {
            path: "/product/:productId",
            element: <Product />,
        },
        {
            path: "/category/:categoryId",
            element: <Category />,
        },

        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/checkout/:productId",
            element: <Checkout />,
        },
        {
            path: "*",
            element: (
                <div>
                    <div
                        className="w-100 d-flex justify-content-center align-items-center flex-column"
                        style={{ height: "500px" }}
                    >
                        <h1>404</h1>
                        <h2>OOPS!</h2>
                        <h3>Page Not Found</h3>
                    </div>
                </div>
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
