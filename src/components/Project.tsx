import type {projects} from '@/lib/data';
import {CardContent, CardFooter, CardHeader, CardTitle} from '@/shared/ui/card';
import {GlassCard} from '@/shared/ui/glass-card';
import React from 'react';
import {motion} from "framer-motion";
import {Github, Youtube} from 'lucide-react';
import {useElementSizes} from '@/hooks/useElementSizes';
import {useContainersScrollAnimations} from '@/hooks/useContainersScrollAnimations.ts';
import {useStepsNavigation} from '@/hooks/useStepsNavigation';
import ShowcaseVideo from "@/components/ShowcaseVideo.tsx";

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
    } = useContainersScrollAnimations(descHeight, navHeight);

    const {
        showcasesScrollRef,
        stepsNavTranslate,
        showcaseVideosTranslate
    } = useStepsNavigation(project.showcases.length);


    return (
        <motion.div className='relative flex mx-auto overflow-clip ' style={{
            maxWidth: containerWidthAnimation,
        }}>
            <div className='flex max-[1080px]:flex-col gap-4 w-full sticky top-22 h-fit'>
                <div
                    className='h-fit min-w-96 w-96'
                >
                    <GlassCard
                        className="group hover:scale-105 overflow-hidden dark:border-purple-500/10 h-full flex flex-col">
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
                                                    <li key={index} className='cursor-pointer py-2'>
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
                <motion.div
                    className='overflow-clip rounded-2xl p-4 max-h-[calc(100vh-7rem)] grow flex flex-col project-container origin-top-left bg-gradient-to-r from-purple-500/5 to-pink-500/5'
                    style={{
                        scale: stepsSpring
                    }}
                >
                    <nav className='w-full overflow-x-clip flex flex-col gap-4'>
                        <motion.ul className='flex px-2 flex-nowrap max-[1080px]:hidden' style={{translateX: stepsNavTranslate}}>
                            {
                                project.showcases.map((showcase, index) => (
                                    <li key={index} className='relative min-w-1/3 w-1/3 max-w-1/3 overflow-hidden h-12'>
                                    <span
                                        className='absolute px-3 w-full text-nowrap text-center overflow-hidden text-ellipsis'>
                                        {showcase.title}
                                    </span>
                                    </li>
                                ))
                            }
                        </motion.ul>
                        <motion.ul className='flex flex-nowrap grow' style={{translateX: showcaseVideosTranslate}}>
                            {
                                project.showcases.map((showcase, index) => (
                                    <li key={index} className='min-w-full px-3'>
                                        <ShowcaseVideo href={showcase.videoUrl}/>
                                    </li>
                                ))
                            }
                        </motion.ul>
                    </nav>
                </motion.div>
            </div>

            <div aria-hidden className='flex opacity-0 w-0'>
                <div className='grow w-[1px] flex flex-col'>
                    <div className='h-[65vh] snap-end '/>
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