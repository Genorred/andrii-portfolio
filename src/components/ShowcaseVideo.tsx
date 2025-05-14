import React, {useEffect, useRef} from 'react';
import {useInView} from "framer-motion";

const ShowcaseVideo = ({href}: {href: string}) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const onTryToPlay = () => {
        setTimeout(async () => {
            try {
                await videoRef?.current?.play();
            } catch (error) {
                onTryToPlay();
            }
        }, 100);
    };
    const isIntersecting = useInView(videoRef);
    useEffect(() => {
        if (isIntersecting) {
            onTryToPlay();
        } else {
            videoRef?.current?.pause();
        }
    }, [isIntersecting])
    return (
        <video className="rounded-2xl max-h-full mx-auto"  ref={videoRef} muted loop playsInline onEnded={onTryToPlay}>
            <source src={href} type="video/mp4"/>
            App interface preview
        </video>
    );
};

export default ShowcaseVideo;