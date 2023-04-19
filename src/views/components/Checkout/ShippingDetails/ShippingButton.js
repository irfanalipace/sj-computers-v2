import Button from "@common/Button/Button";

function ShippingButton({ handleClick, id }) {
    return (
        <Button
            clickHandler={(e) => handleClick(e, true, id)}
            className={"form-button"}
        >
            Use this address
        </Button>
    );
}

export default ShippingButton;
