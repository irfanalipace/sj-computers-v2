import React, { useRef } from "react";
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

    const handleClick = (e, next = false) => {
        next ? toggleAccordion(id + 1) : toggleAccordion(id);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        // Clone the child element and add propToAdd to it
        return React.cloneElement(child, { handleClick });
    });

    return (
        <div className="accordion">
            <div
                className={`accordion-header ${isOpen ? "active" : ""}`}
                onClick={handleClick}
            >
                <div className="row mx-0">
                    <div className={`${summary ? "col-lg-4 col-5" : "col-12"}`}>
                        <div className="d-flex align-items-center">
                            <h4>{id}</h4>
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div className={`${summary && "col-6"}`}>
                        <div className="summary">{summary}</div>
                    </div>
                    <div
                        className={`${
                            summary && "col-lg-2 col-1"
                        } d-flex justify-content-end`}
                    >
                        <button onClick={handleClick} className="change-btn">
                            Change
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`accordion-content ${isOpen ? "active" : ""}`}
                style={{
                    maxHeight: isOpen
                        ? contentRef?.current?.scrollHeight + "px"
                        : "0px", // Set max-height dynamically
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out",
                }}
                ref={contentRef}
            >
                <div className="accordion-body">{childrenWithProps}</div>
            </div>
        </div>
    );
};

export default Accordion;
