import { useEffect, useRef, useState } from 'react';

export const useElementSizes = () => {
    const [descHeight, setDescHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);

    const descRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const getPixels = () => {
            if (descRef.current) {
                setDescHeight(descRef.current.getBoundingClientRect().height);
            }
            if (navRef.current) {
                setNavHeight(navRef.current.getBoundingClientRect().height);
            }
        }
        getPixels()
        document.body.addEventListener('resize', getPixels)
        return () => {
            document.body.removeEventListener('resize', getPixels)
        }
    }, []);

    return {
        descHeight,
        navHeight,
        descRef,
        navRef,
    };
}; 