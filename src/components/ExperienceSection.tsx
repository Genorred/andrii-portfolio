import {workExperience} from "@/lib/data";
import {Briefcase} from "lucide-react";
import {cubicBezier, motion, useMotionTemplate, useScroll, useTransform} from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import * as React from "react";
import {childVariants} from "@/shared/motion.ts";
import './experience.sass'
import {useRef} from "react";
import {useStore} from "@nanostores/react";
import {isCssScrollAnimationsCompitable} from "@/lib/compitable.ts";

export default function ExperienceSection() {
    const ref = useRef(null);
    const $isCssScrollAnimationsCompitable = useStore(isCssScrollAnimationsCompitable)

    const { scrollYProgress } = useScroll({
        target: ref,
        axis: 'y',
        offset: ["start 1.2", "start start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2], {
        ease: cubicBezier(0.1, 1, 0.5, 1)
    });

    return (
        <section
            id="experience"
            className="py-12 bg-gradient-to-b from-muted/20 to-background snap-start"
        >
            <div className="container max-w-4xl mx-auto px-6 md:px-4">
                <MotionWrapper>
                    <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center md:inline-block">
                        <motion.span
                            className="inline-block mr-2"
                            initial={{rotate: 0}}
                            whileInView={{rotate: [0, -10, 10, -5, 5, 0]}}
                            transition={{duration: 0.5, delay: 0.2}}
                            viewport={{once: true}}
                        >
                            💼
                        </motion.span>
                        {" "}
                        Work Experience
                    </h2>
                </MotionWrapper>
                <div className="mb-8">
                    {workExperience.map((job, index) => (
                        <div className='relative ml-4 p-8 rounded-lg border'>
                            <div className='sticky top-18'
                            >
                                <div>
                                    <motion.div
                                        className="flex flex-col gap-0.5"
                                        initial={{opacity: 0, x: -20}}
                                        whileInView={{opacity: 1, x: 0}}
                                        transition={{duration: 0.5, delay: index * 0.2 + 0.1}}
                                        viewport={{once: true, margin: "-50px"}}
                                    >
                                        <div className='flex gap-2 items-center mb-2'>
                                            <h3 className="font-medium text-xl">👨‍💻 {job.position} | {job.company}</h3>
                                            <motion.div
                                                className="flex h-10 w-10 rounded-full border border-purple-500/50 bg-background dark:bg-muted z-10"
                                                initial={{scale: 0}}
                                                whileInView={{scale: 1}}
                                                transition={{
                                                    // type: "spring",
                                                    stiffness: 300,
                                                    damping: 15,
                                                    delay: index * 0.2 + 0.2,
                                                }}
                                                viewport={{once: true, margin: "-50px"}}
                                            >
                                                <img
                                                    src={job.iconSrc}
                                                    alt={`${job.company}'s icon`}
                                                    className="w-48 md:w-60 rounded-full relative"
                                                    style={{objectFit: "cover", aspectRatio: 1}}
                                                />
                                            </motion.div>
                                        </div>
                                        <div className='flex gap-0.5'>
                                            <div className='flex flex-col items-center'>
                                                <p className="text-sm text-muted-foreground">🌍</p>
                                                <p className="text-xs text-muted-foreground/70 mb-2">📅</p>
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <p className="text-sm text-muted-foreground">{job.location}</p>
                                                <p className="text-xs text-muted-foreground/70 mb-2">{job.period}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                                <div className='py-4'>
                                    <motion.div
                                        className="mt-6 md:mt-0 flex justify-center"
                                        variants={childVariants}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        style={{
                                            opacity: $isCssScrollAnimationsCompitable ? undefined : opacity,
                                        }}
                                        initial={{opacity: 0, x: -20}}
                                        whileInView={{opacity: 1, x: 0}}
                                        transition={{duration: 0.5, delay: index * 0.2 + 0.1}}
                                        viewport={{once: true, margin: "-50px"}}
                                    >
                                        <picture>
                                            <source srcSet={`${job.exhibitionSrc}.webp`} type="image/webp"/>
                                            <img
                                                src={`${job.exhibitionSrc}.jpg`}
                                                alt={`${job.company}'s project preview`}
                                                className=" ring-2 ring-purple-500/50 rounded-2xl experience-background"
                                            />
                                        </picture>
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div
                                className="sticky top-0 mb-8 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-purple-500/20 dark:bg-card/10 dark:border-purple-500/10 shadow-sm"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 0.2}}
                                viewport={{once: true}}
                            >
                                <div className="flex items-center mb-3">
                                    <div
                                        className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/10 mr-2">
                                        <Briefcase className="h-4 w-4 text-purple-500"/>
                                    </div>
                                    <h4 className="text-sm font-medium">Key Achievements</h4>
                                </div>
                                <ul className="list-none ml-4 space-y-2 text-sm">
                                    {job.achievements.map((achievement, i) => (
                                        <motion.li
                                            key={i}
                                            ref={ref}
                                            className="text-muted-foreground relative pl-6"
                                            initial={{opacity: 0, x: -10}}
                                            whileInView={{opacity: 1, x: 0}}
                                            transition={{duration: 0.3, delay: 0.1 * i}}
                                            viewport={{once: true}}
                                        >
                                            {achievement}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
}
