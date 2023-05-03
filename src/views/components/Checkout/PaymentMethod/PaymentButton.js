import Button from "@common/Button/Button";

function PaymentButton({ isLoading, clickHandler, disabled }) {
    return (
        <Button
            isLoading={isLoading}
            className="payment-btn"
            clickHandler={clickHandler}
            disabled={disabled}
        >
            Proceed for payment
        </Button>
    );
}

export default PaymentButton;
