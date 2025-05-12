import { useRef } from 'react';
import { useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export const useScrollAnimations = (descHeight: number, step: number, navHeight: number) => {
    const stepsScrollRef = useRef(null);
    const swing = 50;

    const { scrollYProgress } = useScroll({
        target: stepsScrollRef,
        axis: 'y',
        offset: ["start 0.35", "end end"],
    });

    const containerWidthTransform = useTransform(scrollYProgress, [0, step + 0.01], ['864px', '1280px']);
    const containerSpring = useSpring(containerWidthTransform, { stiffness: 400 });

    const infoCardHeight = useTransform(scrollYProgress, [0, step], [descHeight, navHeight]);
    const infoCardSpring = useSpring(infoCardHeight, { stiffness: 400 });
    const infoCardHeightPx = useMotionTemplate`${infoCardSpring}px`;

    const descTransition = useTransform(scrollYProgress, [0, step], [swing, descHeight + swing]);
    const descSpring = useSpring(descTransition, { stiffness: 400 });
    const descTranslate = useMotionTemplate`translateY(calc(-${descSpring}px + ${swing}px))`;

    const navTransition = useTransform(scrollYProgress, [0, step], [swing, descHeight + swing]);
    const navSpring = useSpring(navTransition, { stiffness: 400 });
    const navTranslate = useMotionTemplate`translateY(calc(-${navSpring}px + ${swing}px))`;

    const stepsTransition = useTransform(scrollYProgress, [0, step], [0, 1]);
    const stepsSpring = useSpring(stepsTransition, { stiffness: 400 });

    return {
        stepsScrollRef,
        containerSpring,
        infoCardHeightPx,
        descTranslate,
        navTranslate,
        stepsSpring,
        scrollYProgress
    };
}; 