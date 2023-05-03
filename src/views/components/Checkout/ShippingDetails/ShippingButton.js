import Button from "@common/Button/Button";

function ShippingButton({ handleClick, id, isLoading }) {
    return (
        <Button
            clickHandler={(e) => handleClick(e, true, id)}
            className={"form-button"}
            isLoading={isLoading}
        >
            Use this address
        </Button>
    );
}

export default ShippingButton;
