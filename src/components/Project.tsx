import type {projects} from '@/lib/data';
import {CardContent, CardFooter, CardHeader, CardTitle} from '@/shared/ui/card';
import {GlassCard} from '@/shared/ui/glass-card';
import React, {useEffect, useRef, useState} from 'react';
import {motion, useMotionTemplate, useScroll, useSpring, useTransform} from "framer-motion";
import {Github, Youtube} from 'lucide-react';
import {cn} from "@/lib/utils.ts";

const Project = ({project}: {
    project: typeof projects[number]
}) => {
    const ref = useRef(null);

    const {scrollYProgress} = useScroll({
        target: ref,
        axis: 'y',
        offset: ["start 0.35", "end end"],
    });
    // scrollYProgress.on('change', state => console.log(state));
    const [descHeight, setDescHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0)

    const descRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    // Измеряем высоты после рендера
    useEffect(() => {
        const getPixels = () => {
            if (descRef.current) {
                setDescHeight(descRef.current.getBoundingClientRect().height);
            }
            if (navRef.current) {
                setNavHeight(navRef.current.getBoundingClientRect().height);
            }
            if (containerRef.current) {
                setContainerWidth(containerRef.current.getBoundingClientRect().width);
            }
        }
        getPixels()
        document.body.addEventListener('resize', getPixels)
        return () => {
            document.body.removeEventListener('resize', getPixels)
        }
    }, []);
    // scrollYProgress.on('change', state => console.log(state));

    const swing = 50
    const step = 0.03

    const containerWidthTransform = useTransform(scrollYProgress, [0, step + 0.01], ['864px', '1280px'])
    const containerSpring = useSpring(containerWidthTransform, {stiffness: 400})

    const infoCardHeight = useTransform(scrollYProgress, [0, step], [descHeight, navHeight])
    const infoCardSpring = useSpring(infoCardHeight, {stiffness: 400})
    const infoCardHeightPx = useMotionTemplate`${infoCardSpring}px`

    const descTransition = useTransform(scrollYProgress, [0, step], [swing, descHeight + swing])
    const descSpring = useSpring(descTransition, {stiffness: 400})
    const descTranslate = useMotionTemplate`translateY(calc(-${descSpring}px + ${swing}px))`

    const navTransition = useTransform(scrollYProgress, [0, step], [swing, descHeight + swing])
    const navSpring = useSpring(navTransition, {stiffness: 400})
    const navTranslate = useMotionTemplate`translateY(calc(-${navSpring}px + ${swing}px))`

    const stepsTransition = useTransform(scrollYProgress, [0, step], [0, 1])
    const stepsSpring = useSpring(stepsTransition, {stiffness: 400})
    stepsSpring.on('change', state => console.log(state))
    const stepsTranslate = useMotionTemplate`scale(${stepsSpring}))`
    return (
        <motion.div className={cn('relative flex gap-2 w-full mx-auto overflow-clip', {})} ref={ref} style={{
            maxWidth: containerSpring,
        }}>
            <div
                className='h-fit w-96 sticky top-22'
            >
                <GlassCard
                    className="group hover:scale-105 overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
                    <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                        <CardTitle
                            className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300">
                            {project.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div className='overflow-hidden' style={{
                            height: infoCardHeightPx
                        }}>
                            <motion.div
                                style={{
                                    transform: descTranslate,
                                }}
                            >
                                <ul className="list-disc ml-4 space-y-1 text-sm transition-all duration-300"
                                    ref={descRef}>
                                    {project.description.map((desc, i) => (
                                        <motion.li
                                            key={i}
                                            className="text-muted-foreground"
                                            initial={{opacity: 0, x: -10}}
                                            whileInView={{opacity: 1, x: 0}}
                                            transition={{delay: i * 0.1}}
                                            viewport={{once: true}}
                                        >
                                            {desc}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div
                                style={{
                                    transform: navTranslate,
                                }}
                            >
                                <nav ref={navRef}>
                                    <ul className='flex flex-col gap-2'>
                                        {
                                            project.showcases.map(({title}, index) => (
                                                <li className='line-clamp-1 cursor-pointer py-2'>
                                                    <a href={`#${project.title}-${title.replace(/ /g, '-')}`}>
                                                        {title}
                                                    </a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </motion.div>
                        </motion.div>

                    </CardContent>
                    <CardFooter
                        className="flex flex-col justify-center md:justify-start items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link pt-8"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Github
                                className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300"/>
                            View on GitHub 🔗
                        </motion.a>
                        <motion.a
                            href={project.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link pt-8"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <Youtube
                                className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300"/>
                            Showcase on Youtube 🔗
                        </motion.a>
                    </CardFooter>
                </GlassCard>
            </div>

            <div aria-hidden className='opacity-0 w-0'>
                {
                    project.showcases.map((showcase, index) => (
                        <div className='h-[600px]' id={`${project.title}-${showcase.title.replace(/ /g, '-')}`}>
                            DASH
                        </div>
                    ))
                }
            </div>
            <motion.div
                className='sticky top-22 max-h-[calc(100vh-7rem)] grow flex project-container origin-top-left bg-gradient-to-r from-purple-500/5 to-pink-500/5'
                style={{
                    scale: stepsSpring
                }}
            >
                {
                    project.showcases.map((showcase, index) => (
                        <div className='h-[600px]'>
                            DASH
                        </div>
                    ))
                }
            </motion.div>
        </motion.div>
    );
};

export default Project;