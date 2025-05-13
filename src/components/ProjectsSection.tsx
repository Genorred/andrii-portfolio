import React, {useRef} from "react";
import {projects} from "@/lib/data";
import MotionWrapper from "./MotionWrapper";
import {cubicBezier, useScroll, useTransform} from "framer-motion";
import {useStore} from "@nanostores/react";
import {isCssScrollAnimationsCompitable} from "@/lib/compitable.ts";
import Project from "@/components/Project.tsx";

export default function ProjectsSection() {
    // const ref = useRef(null);
    // const $isCssScrollAnimationsCompitable = useStore(isCssScrollAnimationsCompitable)
    //
    // const {scrollYProgress} = useScroll({
    //     target: ref,
    //     axis: 'y',
    //     offset: ["start start", "end end"],
    // });
    //
    // const opacity = useTransform(scrollYProgress, [0, 1], [1, 0], {
    //     ease: cubicBezier(0.1, 1, 0.5, 1)
    // });
    // scrollYProgress.on('change', (latestValue) => console.log(latestValue))
    return (
        <section id="projects" className="py-12 relative h-fit">
            <div className="px-6 md:px-4">
                <div className='container max-w-4xl mx-auto'>
                    <MotionWrapper>
                        <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
                            🚀 Projects
                        </h2>
                    </MotionWrapper>
                </div>

                <div>
                    {projects.map((project, index) => (
                        <MotionWrapper key={index} delay={index * 0.2}>
                            <Project project={project} />
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
