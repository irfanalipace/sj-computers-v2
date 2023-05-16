import React, { Suspense } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
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
const Order = React.lazy(() => import("@pages/Account/Orders"));
const Cart = React.lazy(() => import("@components/ShoppingCart/Cart"));
const Checkout = React.lazy(() => import("@pages/Checkout/Checkout"));
// const OrderPage = React.lazy(() => import("@pages/OrderPage/OrderPage.js"));
const Test = React.lazy(() => import("@pages/Test/Test"));
import Loader from "@common/LoaderComponent/LoaderComponent";
import Contact from "@components/Footer/FooterMenu/Contact";
import Policy from "@pages/Policy/Policy";

export const Router = () => {
    const routes = [
        {
            path: "/",
            element: (
                <Suspense fallback={<Loader />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/login",
            element: (
                <AuthRoute>
                    <Suspense fallback={<Loader />}>
                        <LoginForm />
                    </Suspense>
                </AuthRoute>
            ),
        },
        {
            path: "/register",
            element: (
                <AuthRoute>
                    <Suspense fallback={<Loader />}>
                        <Register />
                    </Suspense>
                </AuthRoute>
            ),
        },
        {
            path: "/email-sent",
            element: (
                <AuthRoute>
                    <Suspense fallback={<Loader />}>
                        <Emailsent />
                    </Suspense>
                </AuthRoute>
            ),
        },
        {
            path: "/forget-password",
            element: (
                <AuthRoute>
                    <Suspense fallback={<Loader />}>
                        <ForgetPassword />
                    </Suspense>
                </AuthRoute>
            ),
        },
        {
            path: "/reset-password",
            element: (
                <AuthRoute>
                    <Suspense fallback={<Loader />}>
                        <ResetPassword />
                    </Suspense>
                </AuthRoute>
            ),
        },
        {
            path: "/product/:productId",
            element: (
                <Suspense fallback={<Loader />}>
                    <Product />
                </Suspense>
            ),
        },
        {
            path: "/category/:categoryId",
            element: (
                <Suspense fallback={<Loader />}>
                    <Category />
                </Suspense>
            ),
        },

        {
            path: "/account",
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                        <Account />
                    </Suspense>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/profile",
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>
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
                    <Suspense fallback={<Loader />}>
                        <Security />
                    </Suspense>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/orders",
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                        <Order />
                    </Suspense>
                </ProtectedRoute>
            ),
        },
        {
            path: "/cart",
            element: (
                <Suspense fallback={<Loader />}>
                    <Cart />
                </Suspense>
            ),
        },
        {
            path: "/checkout/:productId",
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<Loader />}>
                        <Checkout />
                    </Suspense>
                </ProtectedRoute>
            ),
        },     {
            path: "/policy-page",
            element: (
               
                    <Suspense fallback={<Loader />}>
                       <Policy />
                    </Suspense>
               
            ),
        },
        {
            path: "/checkout",
            element: (
              
                    <Suspense fallback={<Loader />}>
                        <Checkout />
                    </Suspense>
                
            ),
        },
        {
            path: "/contact",
            element: (
                <Suspense fallback={<Loader />}>
                    <Contact />
                </Suspense>
            ),
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
            element: (
                <Suspense fallback={<Loader />}>
                    <Test />
                </Suspense>
            ),
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
    if (!isAuthenticated) {
        const location = useLocation();
        const redirectURL = location.pathname;
        console.log("auth: ", redirectURL);

        window.localStorage.setItem("redirectURL", redirectURL);
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export function AuthRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let redirectRoute = "/";

    if (isAuthenticated) {
        const redirectURL = localStorage.getItem("redirectURL");
        localStorage.removeItem("redirectURL");
        if (redirectURL) redirectRoute = redirectURL;
    }

    return isAuthenticated ? (
        <Navigate to={`${redirectRoute}?firstLogin=true`} replace />
    ) : (
        children
    );
}
