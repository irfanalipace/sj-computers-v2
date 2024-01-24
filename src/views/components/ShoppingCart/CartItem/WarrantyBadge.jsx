import React from "react";

function WarrantyBadge({ durationInYears }) {
    return (
        <p className="py-2 px-3 rounded-5 text-white my-1 bg-success">
            {durationInYears
                ? durationInYears + "+ years warranty"
                : "lifetime warranty"}
        </p>
    );
}

export default WarrantyBadge;
