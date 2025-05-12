import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export const useStepsNavigation = (scrollYProgress: any, step: number, showcasesLength: number) => {
    const stepsRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(stepsRef);

    useEffect(() => {
        const html = document.getElementsByTagName('html').item(0);
        if (html) {
            if (isInView) {
                html.style.scrollSnapType = 'y mandatory';
            } else {
                html.style.scrollSnapType = '';
            }
        }
    }, [isInView]);

    const stepsNavTransform = useTransform(
        scrollYProgress,
        [step * 2, 1],
        [0, -(1 / 3 * (showcasesLength - 1))]
    );
    const stepsNavSpring = useSpring(stepsNavTransform, { stiffness: 400 });
    const stepsNavTranslate = useMotionTemplate`calc((1/3 + ${stepsNavSpring}) * 100%)`;

    return {
        stepsRef,
        stepsNavTranslate
    };
}; 