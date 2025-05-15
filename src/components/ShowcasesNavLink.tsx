import React from 'react';
import {motion, MotionValue, useMotionTemplate, useTransform} from "framer-motion";
import {atom} from 'nanostores';
import {useStore} from "@nanostores/react";
import {isDark} from "@/shared/ui/theme-toggle.tsx";

export const showcaseIndexInView = atom(0);

const ShowcaseNavLink = ({projectTitle, title, index, scrollYProgress, totalAmount}: {
    projectTitle: string;
    title: string,
    index: number,
    scrollYProgress: MotionValue<number>,
    totalAmount: number
}) => {
    const step = 1 / totalAmount;

    const $showcaseIndexInView = useStore(showcaseIndexInView);
    scrollYProgress.on('change', (value: number) => {
        const newIndex = Math.round(value * totalAmount) - 1
        console.log(newIndex)
        if (newIndex != $showcaseIndexInView) {
            showcaseIndexInView.set(newIndex)
        }
    })

    const difference = useTransform(scrollYProgress, (value) => {
        return 1 - Math.abs((index + 1) * step - value);
    });

    const $isDark = useStore(isDark);
    console.log($isDark)
    const lightness = useTransform(difference, (diff) => {
        if ($isDark) {
            return 100 - Math.pow(diff, 2) * 37.27;
        } else {
            return Math.pow(diff, 4) * 63.73;
        }
    });

    const colorAnimation = useMotionTemplate`hsl(273.41, 100%, ${lightness}%)`;

    return (
        <motion.li key={index} className='cursor-pointer py-2' style={{
            color: colorAnimation,
        }}>
            <a href={`#${projectTitle}-${title.replace(/ /g, '-')}`}>
                {title}
            </a>
        </motion.li>
    );
};

export default ShowcaseNavLink;