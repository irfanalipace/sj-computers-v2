import React, { useState, useEffect, useRef } from "react";

const VisibleOnScroll = ({ children }) => {
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                }
            },
            { threshold: 0.1 }
        ); // You can adjust the threshold as needed

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [hasBeenVisible]);

    return <div ref={elementRef}>{hasBeenVisible && children}</div>;
};

export default VisibleOnScroll;
