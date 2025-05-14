import {useRef} from 'react';
import {useMotionTemplate, useScroll, useSpring, useTransform} from 'framer-motion';

export const useContainersScrollAnimations = (descHeight: number, navHeight: number) => {
    const containersAnimationOffsetRef = useRef(null);
    const swing = 50;

    const {scrollYProgress} = useScroll({
        target: containersAnimationOffsetRef,
        axis: 'y',
        offset: ["start end", "end end"],
    });

    const containerWidthTransform = useTransform(scrollYProgress, [0, 1], ['864px', '1280px']);
    const containerWidthAnimation = useSpring(containerWidthTransform, {stiffness: 400});

    const infoCardHeightTransform = useTransform(scrollYProgress, [0, 1], [descHeight, navHeight]);
    const infoCardHeightAnimation = useSpring(infoCardHeightTransform, {stiffness: 400});

    const cardLinksAppearAnimation = useSpring(scrollYProgress, {stiffness: 400});

    const cardLinksDisappearAnimation = useTransform(scrollYProgress, [0, 1], [128, 0]);

    const descriptionTransform = useTransform(scrollYProgress, [0, 1], [swing, descHeight + swing]);
    const descriptionSpring = useSpring(descriptionTransform, {stiffness: 400});
    const descriptionTranslateAnimation = useMotionTemplate`translateY(calc(-${descriptionSpring}px + ${swing}px))`;

    const navTitlesTransform = useTransform(scrollYProgress, [0, 1], [swing, descHeight + swing]);
    const navTitlesSpring = useSpring(navTitlesTransform, {stiffness: 400});
    const navTitlesTranslateAnimation = useMotionTemplate`translateY(calc(-${navTitlesSpring}px + ${swing}px))`;

    const stepsTransition = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const stepsSpring = useSpring(stepsTransition, {stiffness: 400});

    return {
        containersAnimationOffsetRef,
        containerWidthAnimation,
        infoCardHeightAnimation,
        descriptionTranslateAnimation,
        navTitlesTranslateAnimation,
        stepsSpring,
        cardLinksAppearAnimation,
        cardLinksDisappearAnimation
    };
}; 