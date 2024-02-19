import React from "react";
import "./WarrantyBadge.css";
function WarrantyBadge({ durationInYears, planPrice }) {
    return (
        <div className="d-flex align-items-center justify-content-between w-100">
            {/* <p className="me-3 py-2 px-3 rounded-5 text-white my-1 bg-success">
                {durationInYears
                    ? durationInYears + "+ years warranty"
                    : "lifetime warranty"}
            </p>
            <p className="fs-6 fw-medium">${planPrice}</p> */}

            <div className="protection-lables-warntity-warranty-badge text-start px-2 py-2">
                <p
                    className="dev-sj-computers-sections-dev-badge text-start ms-0"
                    style={{ marginBottom: "2px" }}
                >
                    SJ Computer
                </p>
                <p className="protection-name-dev-protection-p text-start">
                    Warranty
                </p>

                <div className="protection-lables-warntity-durations-year ">
                    <span className="text-start ms-0 mt-3">
                        {/* {cartData?.plan?.durationInYears
                        ? cartData?.plan?.durationInYears + " years"
                        : "Tech Unlimited"} */}
                        {durationInYears}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default WarrantyBadge;
