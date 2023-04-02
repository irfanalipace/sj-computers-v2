import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "@pages/Home/Home";
import Login from "@pages/Auth/Login";
import Profile from "@pages/User/Profile";

import React from "react";

export const Router = () => {
    const routes = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
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
