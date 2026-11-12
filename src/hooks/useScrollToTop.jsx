import { useState, useEffect } from "react";

export const useScrollToTop = ( threshold = 300 ) => {
    // Seed the state from the current position: if the page is already
    // scrolled (reload, back navigation) the button must show immediately,
    // without waiting for the first scroll event.
    const [ isVisible, setIsVisible ] = useState(
        () => typeof window !== "undefined" && window.scrollY > threshold
    );

    // scroll up btn is visible only when we scroll down the viewport
    useEffect (() => {

        const handleScroll = () => {

            setIsVisible(window.scrollY > threshold);

        };

        // Sync once on mount / threshold change, then follow the scroll.
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        // cleanup function, before re-render!!!
        return () => window.removeEventListener('scroll', handleScroll);

    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth'
        });
    };

    return { isVisible, scrollToTop };
};
