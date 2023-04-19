import { useRef } from "react";
import "./Accordion.css";

const Accordion = ({
    id,
    title,
    summary,
    children,
    toggleAccordion,
    isOpen,
}) => {
    const contentRef = useRef(null);

    const handleClick = () => {
        toggleAccordion(id);
    };

    return (
        <div className="accordion">
            <div
                className={`accordion-header ${isOpen ? "active" : ""}`}
                onClick={handleClick}
            >
                <div className="row mx-0">
                    <div className="col-4">
                        <div className="d-flex align-items-center">
                            <h4>{id}</h4>
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="summary">{summary}</div>
                    </div>
                    <div className="col-2">
                        <button onClick={handleClick} className="change-btn">
                            Change
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`accordion-content ${isOpen ? "active" : ""}`}
                // style={{
                //     maxHeight: isOpen
                //         ? contentRef.current.scrollHeight + "px"
                //         : "0px", // Set max-height dynamically
                //     overflow: "hidden",
                //     transition: "max-height 0.3s ease-in-out",
                // }}
                ref={contentRef}
            >
                <div className="accordion-body">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
