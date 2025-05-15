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
    const containerWidthAnimation = containerWidthTransform;

    const infoCardHeightTransform = useTransform(scrollYProgress, [0, 1], [descHeight, navHeight]);
    const infoCardHeightAnimation = infoCardHeightTransform;

    const cardLinksAppearAnimation = scrollYProgress;

    const cardLinksDisappearAnimation = useTransform(scrollYProgress, [0, 1], [128, 0]);

    const descriptionTransform = useTransform(scrollYProgress, [0, 1], [swing, descHeight + swing]);
    const descriptionSpring = descriptionTransform;
    const descriptionTranslateAnimation = useMotionTemplate`translateY(calc(-${descriptionSpring}px + ${swing}px))`;

    const navTitlesTransform = useTransform(scrollYProgress, [0, 1], [swing, descHeight + swing]);
    const navTitlesSpring = navTitlesTransform;
    const navTitlesTranslateAnimation = useMotionTemplate`translateY(calc(-${navTitlesSpring}px + ${swing}px))`;

    const stepsTransition = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const stepsSpring = stepsTransition;

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