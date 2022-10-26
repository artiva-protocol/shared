import { useEffect, useRef, useState } from "react";

const useObserver = () => {
  const loaderElementRef = useRef<any>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [enabled, setEnabledValue] = useState(false);
  const [intersecting, setIntersecting] = useState(false);

  console.log("loaderElementRef shared", loaderElementRef);

  useEffect(() => {
    observer.current = new IntersectionObserver((entry) => {
      entry.map((x) => {
        setIntersecting(
          x?.isIntersecting && Math.floor(x.intersectionRatio) === 1
        );
      });
    });
  }, []);

  const setEnabled = (value: boolean) => {
    setEnabledValue(value);
  };

  useEffect(() => {
    if (!loaderElementRef) return;

    if (enabled && loaderElementRef.current) {
      observer.current?.observe(loaderElementRef.current);
    } else {
      observer.current?.unobserve(loaderElementRef.current);
      setIntersecting(false);
    }
  }, [enabled, loaderElementRef]);

  return {
    setEnabled,
    enabled,
    intersecting,
    loaderElementRef,
  };
};

export default useObserver;
