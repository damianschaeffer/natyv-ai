import { useEffect, useRef, useState } from "react";

/**
 * Marks an element once it is close enough to the viewport to prepare its
 * media. The one-way transition keeps expensive resources from being
 * re-created while the visitor scrolls back and forth.
 */
export function useNearViewport<T extends Element>(rootMargin = "320px 0px") {
  const ref = useRef<T | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setHasEnteredViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHasEnteredViewport(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, hasEnteredViewport };
}
