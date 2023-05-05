import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = React.lazy(() => import("@pages/Home/Home"));
const LoginForm = React.lazy(() => import("@pages/Auth/LoginForm"));
const Register = React.lazy(() => import("@pages/Auth/Register"));
const ForgetPassword = React.lazy(() =>
    import("@pages/Auth/ForgetPassword/ForgetPassword")
);
const ResetPassword = React.lazy(() =>
    import("@pages/Auth/ForgetPassword/ResetPassword")
);
const Emailsent = React.lazy(() => import("@pages/Auth/EmailSent"));
const Product = React.lazy(() => import("@pages/Product/Product"));
const Category = React.lazy(() => import("@pages/Category/Category"));
const Account = React.lazy(() => import("@pages/Account/Account"));
const Profile = React.lazy(() => import("@pages/Account/Profile"));
const Security = React.lazy(() => import("@pages/Account/Security"));
const Cart = React.lazy(() => import("@components/ShoppingCart/Cart"));
const Checkout = React.lazy(() => import("@pages/Checkout/Checkout"));
const Test = React.lazy(() => import("@pages/Test/Test"));

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
            path: "/reset-password",
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
            path: "/account",
            element: (
                <ProtectedRoute>
                    <Account />
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/profile",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/update-address",
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/update-password",
            element: (
                <ProtectedRoute>
                    <Security />
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/orders",
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
            path: "/checkout",
            element: <Checkout />,
        },
        {
            path: "/success-transaction",
            element: (
                <div>
                    <div
                        className="w-100 d-flex justify-content-center align-items-center flex-column"
                        style={{ height: "500px" }}
                    >
                        <h1>Transaction Successfull</h1>
                    </div>
                </div>
            ),
        },
        {
            path: "/test",
            element: <Test />,
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
