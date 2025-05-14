import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const useIsMobile = (px: number = 768): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const updateSize = (): void => {
            setIsMobile(window.innerWidth < px);
        };
        updateSize();

        window.addEventListener('resize', debounce(updateSize, 250));
        // updateSize();
        return (): void => window.removeEventListener('resize', updateSize);
    }, []);

    return isMobile;
};

export default useIsMobile;
