import React, { Suspense } from 'react';
import { Navigate, useRoutes, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// const Home = React.lazy(() => import("@pages/Home/Home"));
const Home = React.lazy(() => import('@pages/Home/Home'));
const LoginForm = React.lazy(() => import('@pages/Auth/LoginForm'));
const Register = React.lazy(() => import('@pages/Auth/Register'));
const ForgetPassword = React.lazy(
  () => import('@pages/Auth/ForgetPassword/ForgetPassword'),
);
const ResetPassword = React.lazy(
  () => import('@pages/Auth/ForgetPassword/ResetPassword'),
);
const Emailsent = React.lazy(() => import('@pages/Auth/EmailSent'));
const Product = React.lazy(() => import('@pages/Product/Product'));
const ProductList = React.lazy(() => import('@pages/Product/ProductsBySearch'));
const Category = React.lazy(() => import('@pages/Category/Category'));
const CategoryProduct = React.lazy(
  () => import('@pages/Category/CategoryProduct'),
);
const Account = React.lazy(() => import('@pages/Account/Account'));
const Profile = React.lazy(() => import('@pages/Account/Profile'));
const Security = React.lazy(() => import('@pages/Account/Security'));
const Order = React.lazy(() => import('@pages/Account/Orders'));
const Cart = React.lazy(() => import('@components/ShoppingCart/Cart'));
const Checkout = React.lazy(() => import('@pages/Checkout/Checkout'));
const MobileCheckout = React.lazy(
  () => import('@pages/Checkout/MobileCheckout'),
);
const Test = React.lazy(() => import('@pages/Test/Test'));
const ThankYou = React.lazy(() => import('@pages/Thankyou/Thankyou'));
const RefundOrder = React.lazy(() => import('@pages/RefundOrder/RefundOrder'));
const Careers = React.lazy(() => import('@pages/Careers/Careers'));
const CareerView = React.lazy(() => import('@pages/Careers/CareerView'));
const TrackOrder = React.lazy(() => import('@pages/TrackOrder'));
const Contact = React.lazy(
  () => import('@components/Footer/FooterMenu/Contact'),
);
const Policy = React.lazy(() => import('@pages/Policy/Policy'));
const SkuPage = React.lazy(() => import('@pages/SKUTables/SkuPage'));

const BlogList = React.lazy(() => import('@pages/Blog/BlogsList'));
const BlogDetails = React.lazy(() => import('@pages/Blog/BlogDetails'));
import NotFound from '@pages/NotFound/NotFound';

import Loader from '@common/LoaderComponent/LoaderComponent';
import PageWrapper from '@components/PageWrapper/PageWrapper';
import OrderReview from './views/components/OrderPage/OrderReview';

const OrderDetails = React.lazy(
  () => import('./views/pages/OrderDetails.jsx/OrderDetails'),
);

const ProductCateogoryPage = React.lazy(
  () => import('./views/pages/ProductCategoryPage/ProductCategoryPage'),
);
const AddToCart = React.lazy(() => import('./views/pages/AddToCart/AddToCart'));
const ProductNewReviews = React.lazy(
  () => import('./views/components/Product/ProductReviews/ProductNewReviews'),
);
const CategoryBlogs = React.lazy(() => import('@pages/Blog/CategoryBlogs'));
const ApplyNow = React.lazy(() => import('./views/pages/Careers/ApplyNow'));
// import Layout from "./views/pages/PageLayout/Layout";

const Router = () => {
  const routes = [
    {
      path: '/',
      exactPath: true,
      element: (
        <Suspense fallback={<Loader />}>
          <PageWrapper>
            <Home />
          </PageWrapper>
        </Suspense>
      ),
    },
    {
      path: '/login',
      element: (
        <AuthRoute>
          <PageWrapper>
            <LoginForm />
          </PageWrapper>
        </AuthRoute>
      ),
    },
    {
      path: '/register',
      element: (
        <AuthRoute>
          <PageWrapper>
            <Register />
          </PageWrapper>
        </AuthRoute>
      ),
    },
    {
      path: '/email-sent',
      element: (
        <AuthRoute>
          <PageWrapper>
            <Emailsent />
          </PageWrapper>
        </AuthRoute>
      ),
    },
    {
      path: '/forget-password',
      element: (
        <AuthRoute>
          <PageWrapper>
            <ForgetPassword />
          </PageWrapper>
        </AuthRoute>
      ),
    },
    {
      path: '/forgot_password',
      element: (
        <AuthRoute>
          <PageWrapper>
            <ResetPassword />
          </PageWrapper>
        </AuthRoute>
      ),
    },
    {
      path: '/:title/dp/:productId',
      element: (
        <PageWrapper>
          <Product />
        </PageWrapper>
      ),
    },

    {
      path: '/products/search',
      element: (
        <PageWrapper>
          <ProductList />
        </PageWrapper>
      ),
    },

    {
      path: '/add-review/:productId',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <ProductNewReviews />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },

    {
      path: '/category',
      element: (
        <PageWrapper>
          <CategoryProduct />
        </PageWrapper>
      ),
    },

    {
      path: '/category/:categorySlug',
      element: (
        <PageWrapper>
          <Category />
        </PageWrapper>
      ),
    },

    {
      path: '/budget-friendly-desktops',
      element: (
        <PageWrapper>
          <ProductCateogoryPage
            color='linear-gradient(87.71deg, #BB6BED 0%, #74011D 99.77%)'
            heading='Budget Friendly Desktops Under $250'
            desc='Our most popular products based on sales. Updated frequently.'
            pathValue='budget-friendly'
          />
        </PageWrapper>
      ),
    },
    {
      path: '/workstation',
      element: (
        <PageWrapper>
          <ProductCateogoryPage
            color='linear-gradient(88.57deg, #23DE4D 1.22%, #00861E 98.78%)'
            heading='Work Stations for Professionals'
            desc='Our most popular products based on sales. Updated frequently.'
            pathValue='workstation'
          />
        </PageWrapper>
      ),
    },
    {
      path: '/professional-laptop',
      element: (
        <PageWrapper>
          <ProductCateogoryPage
            color='linear-gradient(88.57deg, #489CFF 1.22%, #0061A8 98.78%)'
            heading='Professional Laptops'
            desc='Our most popular products based on sales. Updated frequently.'
            pathValue='professional-laptop'
          />
        </PageWrapper>
      ),
    },

    {
      path: '/top-rated-products',
      element: (
        <PageWrapper>
          <ProductCateogoryPage
            color='linear-gradient(88.57deg, #FB8519 1.22%, #D75A00 98.78%)'
            heading='SJ Computers Top Rating'
            desc='Our most popular products based on sales. Updated frequently'
            pathValue='top-rated-product'
          />
        </PageWrapper>
      ),
    },
    {
      path: '/account/orders/order-details/:id',
      element: (
        <PageWrapper>
          <OrderDetails />
        </PageWrapper>
      ),
    },

    {
      path: '/touch-screen-laptops',
      element: (
        <PageWrapper>
          <ProductCateogoryPage
            color='linear-gradient(87.71deg, #1799B0 0%, #007185 99.77%)'
            heading='Touch Screen Laptop'
            desc='Our most popular products based on sales. Updated frequently.'
            pathValue='touch-screen'
          />
        </PageWrapper>
      ),
    },

    {
      path: '/account',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Account />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/account/profile',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Profile />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/account/update-address',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Profile />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/account/update-password',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Security />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/account/orders',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Order />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/orders-review',
      element: (
        <ProtectedRoute>
          <PageWrapper>
       <OrderReview />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/cart',
      element: (
        <PageWrapper>
          <Cart />
        </PageWrapper>
      ),
    },
    {
      path: '/cart/:title/dp/:productId/:itemAdded',
      element: (
        <PageWrapper>
          <AddToCart />
        </PageWrapper>
      ),
    },
    {
      path: '/cart/:title/dp/:productId',
      element: (
        <PageWrapper>
          <AddToCart />
        </PageWrapper>
      ),
    },
    {
      path: '/checkout/:productId',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <Checkout />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/privacy_policy',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },

    {
      path: '/shipping_policy',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },

    {
      path: '/:blogslug',
      element: (
        <Suspense>
          <BlogDetails />
        </Suspense>
      ),
    },

    {
      path: '/blogs',
      element: (
        <PageWrapper>
          <BlogList />
        </PageWrapper>
      ),
    },

    {
      path: 'blogs/category/:categoryslug',
      element: (
        <PageWrapper>
          <CategoryBlogs />
        </PageWrapper>
      ),
    },

    {
      path: '/about_us',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },

    {
      path: '/what-we-do',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },

    {
      path: '/return_refund_policy',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },
    {
      path: '/term_services',
      element: (
        <PageWrapper>
          <Policy />
        </PageWrapper>
      ),
    },
    {
      path: '/checkout',
      element: (
        // <ProtectedRoute>
        <PageWrapper>
          <Checkout />
          {/* <MobileCheckout /> */}
        </PageWrapper>
        // </ProtectedRoute>
      ),
    },
    {
      path: '/contact',
      element: (
        <PageWrapper>
          <Contact />
        </PageWrapper>
      ),
    },
    {
      path: '/success-transaction',
      element: (
        <div>
          <div
            className='w-100 d-flex justify-content-center align-items-center flex-column'
            style={{ height: '500px' }}>
            <h1>Transaction Successful</h1>
          </div>
        </div>
      ),
    },
    {
      path: '/thank-you',
      element: (
        <PageWrapper>
          <ThankYou />
        </PageWrapper>
      ),
    },

    {
      path: '/test',
      element: (
        <PageWrapper>
          <Test />
        </PageWrapper>
      ),
    },

    {
      path: '/sku',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <SkuPage />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },
    {
      path: '/apply-jobs',
      element: (
        // <ProtectedRoute>
        <PageWrapper>
          <ApplyNow />
        </PageWrapper>
        // </ProtectedRoute>
      ),
    },
    {
      path: '/refund-order',
      element: (
        <PageWrapper>
          <RefundOrder />
        </PageWrapper>
      ),
    },
    {
      path: '/careers',
      element: (
        <PageWrapper>
          <Careers />
        </PageWrapper>
      ),
    },
    {
      path: '/careers/:id',
      element: (
        <PageWrapper>
          <CareerView />
        </PageWrapper>
      ),
    },
    // {
    //     path: "/layout",
    //     element: (
    //         <PageWrapper>
    //           <Layout />
    //         </PageWrapper>
    //     ),
    // },

    {
      path: '/apply-now',
      element: (
        <PageWrapper>
          <ApplyNow />
        </PageWrapper>
      ),
    },

    {
      path: '/track-order/:id/:trackingId',
      element: (
        <ProtectedRoute>
          <PageWrapper>
            <TrackOrder />
          </PageWrapper>
        </ProtectedRoute>
      ),
    },

    {
      path: '*',
      element: <NotFound />,
    },
  ];

  const router = useRoutes(routes);

  return router;
};

export default Router;
export function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    const location = useLocation();
    const redirectURL = location.pathname;
    console.print('auth: ', redirectURL);

    window.localStorage.setItem('redirectURL', redirectURL);
  }
  return isAuthenticated ? children : <Navigate to='/login' replace />;
}

export function AuthRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  let redirectRoute = '/';

  if (isAuthenticated) {
    const redirectURL = localStorage.getItem('redirectURL');
    localStorage.removeItem('redirectURL');
    if (redirectURL) redirectRoute = redirectURL;
  }

  return isAuthenticated ? (
    <Navigate to={`${redirectRoute}?firstLogin=true`} replace />
  ) : (
    children
  );
}
