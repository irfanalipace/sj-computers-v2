import Button from "@common/Button/Button";

function PaymentButton({ isLoading }) {
    return (
        <Button
            isLoading={isLoading}
            className="payment-btn"
            clickHandler={() => console.log("btn click")}
        >
            Proceed for payment
        </Button>
    );
}

export default PaymentButton;
