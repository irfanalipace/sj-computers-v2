import Button from "@common/Button/Button";

function PaymentButton() {
    return (
        <Button
            className="payment-btn"
            clickHandler={() => console.log("btn click")}
        >
            Proceed for payment
        </Button>
    );
}

export default PaymentButton;
