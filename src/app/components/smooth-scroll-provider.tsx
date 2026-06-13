'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplashCursor = dynamic(
    () => import('./ui/reactbits/splashCursor/splashCursor'),
    { ssr: false }
);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync ScrollTrigger with Lenis scroll events
        lenis.on('scroll', ScrollTrigger.update);

        // Connect Lenis to the GSAP Ticker for optimized performance
        const updateTicker = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateTicker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateTicker);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <SplashCursor />
            {children}
        </>
    );
}
