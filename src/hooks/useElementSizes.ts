import { useEffect, useRef, useState } from 'react';

export const useElementSizes = () => {
    const [descHeight, setDescHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);

    const descRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const getPixels = () => {
            if (descRef.current) {
                setDescHeight(descRef.current.clientHeight);
            }
            if (navRef.current) {
                setNavHeight(navRef.current.clientHeight);
            }
        }
        getPixels()
        window.addEventListener('resize', getPixels)
        return () => {
            window.removeEventListener('resize', getPixels)
        }
    }, [descRef, navRef]);

    return {
        descHeight,
        navHeight,
        descRef,
        navRef,
    };
}; 