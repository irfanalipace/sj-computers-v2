import Button from "@common/Button/Button";

function ReviewButton({ handleClick, id }) {
    return (
        <Button
            className="review-done-btn"
            clickHandler={(e) => handleClick(e, true, id)}
        >
            Proceed
        </Button>
    );
}

export default ReviewButton;
