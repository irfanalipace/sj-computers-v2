import { Link } from "react-router-dom";
import Breadcrumb from "@common/Breadrumb/Breadcrumb";
import { breadcrumbRoutes } from "./BreadcrumbRoutes";

const Profile = () => {
    return (
        <div className="account-page">
            <div className="container-xl">
                <Breadcrumb routes={breadcrumbRoutes} />
                <h4>Profile</h4>
            </div>
        </div>
    );
};

export default Profile;
