import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import LoaderComponent from '@common/LoaderComponent/LoaderComponent';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [visibility, setVisibility] = useState({});

  const updateVisibility = (id, isVisible) => {
    setVisibility(prevVisibility => ({
      ...prevVisibility,
      [id]: isVisible,
    }));
  };

  return (
    <VisibilityContext.Provider value={{ visibility, updateVisibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};

const VisibleOnScroll = ({ id, children }) => {
  const ref = useRef(null);
  const { visibility, updateVisibility } = useContext(VisibilityContext);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const observedId = entry.target.id;
      if (!visibility[observedId] && entry.isIntersecting) {
        updateVisibility(observedId, entry.isIntersecting);
        observer.unobserve(ref.current);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [id, updateVisibility]);

  return (
    <div ref={ref} id={id}>
      {visibility[id] && (
        <Suspense fallback={<LoaderComponent />}>{children}</Suspense>
      )}
    </div>
  );
};

export default VisibleOnScroll;
