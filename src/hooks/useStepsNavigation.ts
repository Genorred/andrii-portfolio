import {useEffect, useRef} from 'react';
import {useInView, useMotionTemplate, useScroll, useSpring, useTransform} from 'framer-motion';
import useIsMobile from "@/shared/hooks/useIsMobile.tsx";

export const useStepsNavigation = (showcasesLength: number) => {
    const showcasesScrollRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(showcasesScrollRef);

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
    const {scrollYProgress} = useScroll({
        target: showcasesScrollRef,
        axis: 'y',
        offset: ["start end", "end end"],
    });
    const stepsNavTransform = useTransform(scrollYProgress, [0, 1], [0, (1 / 3 * (showcasesLength ))]);
    const stepsNavSpring = stepsNavTransform;
    const stepsNavTranslate = useMotionTemplate`calc((2/3 - ${stepsNavSpring}) * 100%)`;

    const showcaseVideosTransform = useTransform(scrollYProgress, [0, 1], [0, showcasesLength]);
    const showcaseVideosSpring = showcaseVideosTransform;
    const showcaseVideosTranslate = useMotionTemplate`calc((1 - ${showcaseVideosSpring}) * 100%)`;


    return {
        showcasesScrollRef,
        stepsNavTranslate,
        showcaseVideosTranslate,
        scrollYProgress
    };
}; 