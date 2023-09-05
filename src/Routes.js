import React, { Suspense } from "react";
import { Navigate, useRoutes, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// const Home = React.lazy(() => import("@pages/Home/Home"));
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
const ProductList = React.lazy(() => import("@pages/Product/ProductsBySearch"));
const Category = React.lazy(() => import("@pages/Category/Category"));
const Account = React.lazy(() => import("@pages/Account/Account"));
const Profile = React.lazy(() => import("@pages/Account/Profile"));
const Security = React.lazy(() => import("@pages/Account/Security"));
const Order = React.lazy(() => import("@pages/Account/Orders"));
const Cart = React.lazy(() => import("@components/ShoppingCart/Cart"));
const Checkout = React.lazy(() => import("@pages/Checkout/Checkout"));
const Test = React.lazy(() => import("@pages/Test/Test"));
const ThankYou = React.lazy(() => import("@pages/Thankyou/Thankyou"));
const RefundOrder = React.lazy(() => import("@pages/RefundOrder/RefundOrder"));
const Contact = React.lazy(() =>
    import("@components/Footer/FooterMenu/Contact")
);
const Policy = React.lazy(() => import("@pages/Policy/Policy"));
const SkuPage = React.lazy(() => import("@pages/SKUTables/SkuPage"));
const BlogPage = React.lazy(() => import("@pages/Blog/BlogPage"));

const AboutPage = React.lazy(() => import("@pages/About/AboutPage"));
const WhatWeDoPage = React.lazy(() => import("@pages/WhatWeDo/WhatWeDoPage"));
const BlogSingle = React.lazy(() => import("@pages/Blog/BlogSingle"));
const BlogsDetails = React.lazy(() => import("@pages/Blog/BlogsDetails"));
import NotFound from "@pages/NotFound/NotFound";

import Loader from "@common/LoaderComponent/LoaderComponent";
import PageWrapper from "@components/PageWrapper/PageWrapper";
import CategoryBlogs from "@components/Blog/CategoryBlogs";

const Router = () => {
    const routes = [
        {
            path: "/",
            element: (
                <Suspense fallback={<Loader />}>
                    <PageWrapper>
                        <Home />
                    </PageWrapper>
                </Suspense>
            ),
        },

        {
            path: "/login",
            element: (
                <AuthRoute>
                    <PageWrapper>
                        <LoginForm />
                    </PageWrapper>
                </AuthRoute>
            ),
        },

        {
            path: "/register",
            element: (
                <AuthRoute>
                    <PageWrapper>
                        <Register />
                    </PageWrapper>
                </AuthRoute>
            ),
        },
        {
            path: "/email-sent",
            element: (
                <AuthRoute>
                    <PageWrapper>
                        <Emailsent />
                    </PageWrapper>
                </AuthRoute>
            ),
        },
        {
            path: "/forget-password",
            element: (
                <AuthRoute>
                    <PageWrapper>
                        <ForgetPassword />
                    </PageWrapper>
                </AuthRoute>
            ),
        },
        {
            path: "/forgot_password",
            element: (
                <AuthRoute>
                    <PageWrapper>
                        <ResetPassword />
                    </PageWrapper>
                </AuthRoute>
            ),
        },
        {
            path: "/products/:productId",
            element: (
                <PageWrapper>
                    <Product />
                </PageWrapper>
            ),
        },
        {
            path: "/products/search",
            element: (
                <PageWrapper>
                    <ProductList />
                </PageWrapper>
            ),
        },
        {
            path: "/category/:categorySlug",
            element: (
                <PageWrapper>
                    <Category />
                </PageWrapper>
            ),
        },

        {
            path: "/account",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Account />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/profile",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Profile />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/update-address",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Profile />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/update-password",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Security />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/account/orders",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Order />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/cart",
            element: (
                <PageWrapper>
                    <Cart />
                </PageWrapper>
            ),
        },
        {
            path: "/checkout/:productId",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <Checkout />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/privacy_policy",
            element: (
                <PageWrapper>
                    <Policy />
                </PageWrapper>
            ),
        },

        {
            path: "/shipping_policy",
            element: (
                <PageWrapper>
                    <Policy />
                </PageWrapper>
            ),
        },
        {
            path: "/:blogslug",
            element: (
                <Suspense>
                    <BlogsDetails />
                </Suspense>
            ),
        },

        {
            path: "/blogs",
            element: (
                <PageWrapper>
                    <BlogSingle />
                </PageWrapper>
            ),
        },


        {
            path: "blogs/category/:categoryslug",
            element: (
                <PageWrapper>
                    <CategoryBlogs />
                </PageWrapper>
            ),
        },


        {
            path: "/about_us",
            element: (
                <PageWrapper>
                    <Policy />
                </PageWrapper>
            ),
        },

        {
            path: "/what-we-do",
            element: (
                <PageWrapper>
                    <WhatWeDoPage />
                </PageWrapper>
            ),
        },

        {
            path: "/return_refund_policy",
            element: (
                <PageWrapper>
                    <Policy />
                </PageWrapper>
            ),
        },
        {
            path: "/term_services",
            element: (
                <PageWrapper>
                    <Policy />
                </PageWrapper>
            ),
        },
        {
            path: "/checkout",
            element: (
                // <ProtectedRoute>
                <PageWrapper>
                    <Checkout />
                </PageWrapper>
                // </ProtectedRoute>
            ),
        },
        {
            path: "/contact",
            element: (
                <PageWrapper>
                    <Contact />
                </PageWrapper>
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
                        <h1>Transaction Successful</h1>
                    </div>
                </div>
            ),
        },
        {
            path: "/thank-you",
            element: (
                <PageWrapper>
                    <ThankYou />
                </PageWrapper>
            ),
        },

        {
            path: "/test",
            element: (
                <PageWrapper>
                    <Test />
                </PageWrapper>
            ),
        },

        {
            path: "/sku",
            element: (
                <ProtectedRoute>
                    <PageWrapper>
                        <SkuPage />
                    </PageWrapper>
                </ProtectedRoute>
            ),
        },
        {
            path: "/refund-order",
            element: (
                <PageWrapper>
                    <RefundOrder />
                </PageWrapper>
            ),
        },

        {
            path: "*",
            element: <NotFound />,
        },
    ];

    const router = useRoutes(routes);

    return router;
};

export default Router;
export function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        const location = useLocation();
        const redirectURL = location.pathname;
        console.print("auth: ", redirectURL);

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
