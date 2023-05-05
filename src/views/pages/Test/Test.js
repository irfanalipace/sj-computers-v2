import React from "react";

import { useEffect, useState, useRef } from "react";
const PaymentForm = React.lazy(() => import("react-square-web-payments-sdk"));
const CreditCard = React.lazy(() => import("react-square-web-payments-sdk"));

import { sendTokenApi } from "@api/square";

const Test = () => {
    return (
        <div>
            <PaymentForm
                applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    console.log("token:", token);
                    console.log("verifiedBuyer:", verifiedBuyer);
                    await sendTokenApi({ source_id: token.token });
                }}
                createVerificationDetails={() => ({
                    amount: "1.00",
                    /* collected from the buyer */
                    billingContact: {
                        addressLines: ["123 Main Street", "Apartment 1"],
                        familyName: "Doe",
                        givenName: "John",
                        countryCode: "GB",
                        city: "London",
                    },
                    currencyCode: "GBP",
                    intent: "CHARGE",
                })}
                locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
};

export default Test;
