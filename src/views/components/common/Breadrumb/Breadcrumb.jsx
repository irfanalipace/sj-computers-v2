import { Link, useLocation } from "react-router-dom";
import { breadcrumbRoutes } from "./BreadcrumbRoutes";

import "./Breadcrumb.css";
import { useParams } from "react-router-dom";
const Breadcrumb = ({ routes }) => {
    const { pathname } = useLocation();
    const { productId } = useParams();

    // Create an array of breadcrumb objects based on the current path
    const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "");
    let breadcrumbTrail = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return { path, name: breadcrumbRoutes[path] };
    });

    if (routes?.length > 0) {
        breadcrumbTrail = routes.map((route) => ({
            path: route.link,
            name: route.label,
        }));
    }

    // Render the breadcrumb trail
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbTrail.map((breadcrumb, index) => {
                    // Only show breadcrumbs that the user has navigated to
                    if (breadcrumb.name) {
                        return (
                            <li
                                className="breadcrumb-item"
                                key={breadcrumb.path}
                            >
                                <Link
                                    to={breadcrumb.path}
                                    className={`breadcrumb-link ${
                                        index === breadcrumbTrail.length - 1 &&
                                        "active"
                                    }`}
                                >
                                    {breadcrumb.name}
                                </Link>
                                {index < breadcrumbTrail.length - 1 &&
                                    breadcrumbTrail[index + 1].name && (
                                        <span className="breadcrumb-separator">
                                            &gt;
                                        </span>
                                    )}
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
