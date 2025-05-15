import type {projects} from '@/lib/data';
import {CardContent, CardHeader, CardTitle} from '@/shared/ui/card';
import {GlassCard} from '@/shared/ui/glass-card';
import React from 'react';
import {motion} from "framer-motion";
import {Github, Youtube} from 'lucide-react';
import {useElementSizes} from '@/hooks/useElementSizes';
import {useContainersScrollAnimations} from '@/hooks/useContainersScrollAnimations.ts';
import {useStepsNavigation} from '@/hooks/useStepsNavigation';
import ShowcaseVideo from "@/components/ShowcaseVideo.tsx";
import useIsMobile from "@/shared/hooks/useIsMobile.tsx";
import ShowcasesNavLink, {showcaseIndexInView} from "@/components/ShowcasesNavLink.tsx";
import {useStore} from "@nanostores/react";
import {cn} from "@/lib/utils.ts";

const Project = ({project}: {
    project: typeof projects[number]
}) => {
    const {
        descHeight,
        navHeight,
        descRef,
        navRef,
    } = useElementSizes();

    const {
        containersAnimationOffsetRef,
        containerWidthAnimation,
        infoCardHeightAnimation,
        descriptionTranslateAnimation,
        navTitlesTranslateAnimation,
        stepsSpring,
        cardLinksAppearAnimation,
        cardLinksDisappearAnimation
    } = useContainersScrollAnimations(descHeight, navHeight);

    const {
        showcasesScrollRef,
        stepsNavTranslate,
        showcaseVideosTranslate,
        scrollYProgress
    } = useStepsNavigation(project.showcases.length);

    const isMobile = useIsMobile(1080)
    const $showcaseIndexInView = useStore(showcaseIndexInView);

    return (
        <motion.div className='relative flex mx-auto overflow-clip ' style={{
            maxWidth: containerWidthAnimation,
        }}>
            <div
                className='flex items-center max-[1080px]:flex-col gap-4 w-full sticky top-22 bottom-2 h-[calc(100vh-7rem)]'>
                <div
                    className='h-fit min-w-96 w-96 max-[1080px]:w-full'
                >
                    <GlassCard
                        className="group origin-left hover:scale-105 overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
                        <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                            <CardTitle
                                className="text-center md:text-left group-hover:text-purple-500 transition-colors duration-300 snap-start">
                                {project.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <motion.div className='overflow-hidden' style={{
                                height: infoCardHeightAnimation
                            }}>
                                <motion.div
                                    style={{
                                        transform: descriptionTranslateAnimation,
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
                                        transform: navTitlesTranslateAnimation,
                                    }}
                                >
                                    <nav ref={navRef}>
                                        <ul className='flex flex-col gap-2'>
                                            {
                                                project.showcases.map(({title}, index) => (
                                                    <ShowcasesNavLink key={index} title={title} index={index}
                                                                      scrollYProgress={scrollYProgress}
                                                                      totalAmount={project.showcases.length}
                                                                      projectTitle={project.title}/>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </motion.div>
                            </motion.div>

                        </CardContent>
                        <motion.div
                            // transition={{type: 'spring', stiffness: 400, damping: 30}}
                            style={{height: isMobile ? cardLinksDisappearAnimation : undefined}}
                            className="flex overflow-hidden origin-top-left flex-col justify-center md:justify-start items-center border-t border-border/30 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
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
                                className="flex items-center mb-6 text-sm text-muted-foreground hover:text-purple-500 transition-colors group/link pt-8"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <Youtube
                                    className="h-4 w-4 mr-2 group-hover/link:rotate-12 transition-transform duration-300"/>
                                Showcase on Youtube 🔗
                            </motion.a>
                        </motion.div>
                    </GlassCard>
                </div>
                <motion.div
                    className='overflow-clip rounded-2xl p-4 grow flex flex-col w-full
                    project-container origin-center bg-gradient-to-r from-purple-500/5 to-pink-500/5'
                    style={{
                        scale: stepsSpring
                    }}
                >
                    <nav className='h-full w-full overflow-x-clip flex flex-col gap-4'>
                        <motion.ul className='flex px-2 flex-nowrap max-[1080px]:hidden'
                                   style={{translateX: stepsNavTranslate}}>
                            {
                                project.showcases.map((showcase, index) => (
                                    <li key={index} className='relative min-w-1/3 w-1/3 max-w-1/3 h-12'>
                                    <span
                                        className={cn('absolute  transition-all bg-transparent text-xl px-3 py-1 w-full text-nowrap text-center overflow-hidden text-ellipsis',
                                            {
                                                'scale-125 bg-background/70 px-4 py-2 rounded-lg font-medium shadow-lg translate-y-2 z-10': $showcaseIndexInView === index,
                                            }
                                        )}>
                                        {showcase.title}
                                    </span>
                                    </li>
                                ))
                            }
                        </motion.ul>
                        <motion.ul className='h-full w-full flex flex-nowrap'
                                   style={{translateX: showcaseVideosTranslate}}>
                            {
                                project.showcases.map((showcase, index) => (
                                    <li key={index} className='relative min-w-full min-h-full'>
                                        <div className='max-[1080px]:absolute inset-0 p-3 '>
                                            <ShowcaseVideo href={showcase.videoUrl}/>
                                        </div>
                                    </li>
                                ))
                            }
                        </motion.ul>
                    </nav>
                </motion.div>
            </div>

            <div aria-hidden className='flex opacity-0 w-0'>
                <div className='grow w-[1px] flex flex-col'>
                    <div className='h-[78vh] snap-end '/>
                    <div className='flex'>
                        <div className='h-[10vh]' ref={containersAnimationOffsetRef}/>
                        <div className='' ref={showcasesScrollRef}>

                            {
                                project.showcases.map((showcase, index) => (
                                    <div key={index} className='snap-end w-[1px] h-[600px]'
                                         id={`${project.title}-${showcase.title.replace(/ /g, '-')}`}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='h-[20vh]'/>
            </div>

        </motion.div>
    );
};

export default Project;