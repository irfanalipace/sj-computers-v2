import React, { Suspense, useEffect, useRef, useState } from "react";

const VisibleOnScroll = ({ children }) => {
    const ref = useRef(null);
    const observer = useRef(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        observer.current = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        });
        if (ref.current) {
            observer.current.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.current.unobserve(ref.current);
            }
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    useEffect(() => {
        if (observer.current && isVisible) {
            observer.current.unobserve(ref.current);
        }
    }, [isVisible]);

    return <div ref={ref}>{isVisible && <Suspense>{children}</Suspense>}</div>;
};

export default VisibleOnScroll;
