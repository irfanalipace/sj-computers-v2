import Button from "@common/Button/Button";

function ShippingButton({ handleClick, id, ...rest }) {
    return (
        <Button
            clickHandler={(e) => handleClick(e, true, id)}
            className={"form-button"}
            {...rest}
        >
            Use this address
        </Button>
    );
}

export default ShippingButton;
