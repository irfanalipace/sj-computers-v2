import { useEffect, useState, useRef } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { sendTokenApi } from "@api/square";

// import { init } from "@services/square";
const Test = () => {
    // const cardContainer = useRef(null);
    // const cardButton = useRef(null);
    // const statusContainer = useRef(null);
    // const [buttonHandler, setButtonHandler] = useState();
    // useEffect(() => {
    //     const handlePaymentMethodSubmission = init();
    //     setButtonHandler(handlePaymentMethodSubmission);
    // }, []);
    return (
        // <div>
        //     <form id="payment-form">
        //         <div ref={cardContainer} id="card-container"></div>
        //         <button
        //             ref={cardButton}
        //             onClick={(e) =>
        //                 buttonHandler(
        //                     e,
        //                     cardButton.current,
        //                     statusContainer.current
        //                 )
        //             }
        //             id="card-button"
        //             type="button"
        //         >
        //             Pay $1.00
        //         </button>
        //     </form>
        //     <div ref={statusContainer} id="payment-status-container"></div>
        // </div>
        <div>
            <PaymentForm
                /**
                 * Identifies the calling form with a verified application ID generated from
                 * the Square Application Dashboard.
                 */
                applicationId="sandbox-sq0idb-t8msyKetfNoMu13KbfbYpg"
                /**
                 * Invoked when payment form receives the result of a tokenize generation
                 * request. The result will be a valid credit card or wallet token, or an error.
                 */
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    console.log("token:", token);
                    console.log("verifiedBuyer:", verifiedBuyer);
                    await sendTokenApi({ source_id: token.token });
                }}
                /**
                 * This function enable the Strong Customer Authentication (SCA) flow
                 *
                 * We strongly recommend use this function to verify the buyer and reduce
                 * the chance of fraudulent transactions.
                 */
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
                /**
                 * Identifies the location of the merchant that is taking the payment.
                 * Obtained from the Square Application Dashboard - Locations tab.
                 */
                locationId="L4B6P3RZRKTVQ"
            >
                <CreditCard />
            </PaymentForm>
        </div>
    );
};

export default Test;
