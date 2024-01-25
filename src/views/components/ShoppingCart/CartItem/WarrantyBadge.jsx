import React from "react";

function WarrantyBadge({ durationInYears, planPrice }) {
    return (
        <div className="d-flex align-items-center justify-content-between w-100">
            <p className="me-3 py-2 px-3 rounded-5 text-white my-1 bg-success">
                {durationInYears
                    ? durationInYears + "+ years warranty"
                    : "lifetime warranty"}
            </p>
            <p className="fs-6 fw-medium">${planPrice}</p>
        </div>
    );
}

export default WarrantyBadge;
