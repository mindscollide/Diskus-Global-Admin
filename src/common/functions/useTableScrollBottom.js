import { useEffect, useRef } from "react";

export const useTableScrollBottom = (onBottomReach, threshold = 50) => {
  const isFetchingRef = useRef(false); // debounce trigger

  useEffect(() => {
    const scrollContainer = document.querySelector(".ant-table-body");

    if (!scrollContainer) return;

    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      if (isBottom && !isFetchingRef.current) {
        isFetchingRef.current = true;
        await onBottomReach?.();
        isFetchingRef.current = false;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [onBottomReach, threshold]);
};
