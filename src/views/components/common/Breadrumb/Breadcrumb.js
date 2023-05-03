import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ routes }) => {
    const { pathname } = useLocation();

    // Create an array of breadcrumb objects based on the current path
    const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "");
    const breadcrumbTrail = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return { path, name: routes[path] };
    });

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
                                    className="breadcrumb-link"
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
