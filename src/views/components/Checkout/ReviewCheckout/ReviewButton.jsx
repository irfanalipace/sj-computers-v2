import Button from "@common/Button/Button";

function ReviewButton({ toggleAccordion, id, children }) {
    return (
        <Button
            className="review-done-btn"
            clickHandler={(e) => toggleAccordion(e, true, id)}
        >
            {children}
        </Button>
    );
}

export default ReviewButton;
