import Button from "@common/Button/Button";

function ReviewButton({ toggleAccordion, id }) {
    return (
        <Button
            className="review-done-btn"
            clickHandler={(e) => toggleAccordion(e, true, id)}
        >
            Proceed
        </Button>
    );
}

export default ReviewButton;
