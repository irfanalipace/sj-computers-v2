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

    /**
     * Handle Accordion toggle
     * @param e (event)
     * @param next (false means toggle the active accordion, true means toggle off the current active accordion and open the next accordion)
     * @returns {*}
     */
    const handleToggle = (e, next = false) => {
        next ? toggleAccordion(id + 1) : toggleAccordion(id);
    };

    const handleHeight = () => {
        // this function set the height of accordion according to the inner body
        // if passed down to component as callback then components can call this function to change set accordion height dynamically if inner height changes
        contentRef.current.style.maxHeight = isOpen
            ? contentRef?.current?.scrollHeight + "px"
            : "0px";
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        // Clone the child element and add propToAdd to it
        return React.cloneElement(child, {
            toggleAccordion: handleToggle,
            handleHeight,
        });
    });

    return (
        <div className="accordion">
            <div
                className={`accordion-header ${isOpen ? "active" : ""}`}
                onClick={handleToggle}
            >
                <div className="row mx-0">
                    <div
                        className={`${
                            summary ? "col-lg-4 col-md-5 col-12" : "col-12"
                        }`}
                    >
                        <div className="d-flex align-items-center h-100">
                            <h4>{id}</h4>
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div
                        className={`${
                            summary ? "col-6 d-md-block d-none" : "d-none"
                        }`}
                    >
                        <div className="summary">{summary}</div>
                    </div>
                    <div
                        className={`${
                            summary
                                ? "col-lg-2 col-1 d-md-flex d-none"
                                : "d-none"
                        } d-flex justify-content-end`}
                    >
                        <button onClick={handleToggle} className="change-btn">
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
