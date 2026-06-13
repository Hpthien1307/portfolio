'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from '../../components/heading/heading';
import { achives } from '../achive/achiveList';
import AchiveItem from '../achive/achiveItem';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop: cinematic zoom transition on scroll
        mm.add('(min-width: 768px)', () => {
            const section = sectionRef.current;
            const word = wordRef.current;
            const content = contentRef.current;
            const tSpan = word?.querySelector('.zoom-t');

            if (section && word && content && tSpan) {
                // Calculate the exact center of the 'T' span relative to the parent word element
                const wordRect = word.getBoundingClientRect();
                const tRect = tSpan.getBoundingClientRect();
                const originX = tRect.left - wordRect.left + tRect.width / 2;
                const originY = tRect.top - wordRect.top + tRect.height / 2;

                // Calculate delta to center the 'T' span in the viewport at the end of the zoom
                const viewportCenterX = window.innerWidth / 2;
                const viewportCenterY = window.innerHeight / 2;
                const initialTCenterX = tRect.left + tRect.width / 2;
                const initialTCenterY = tRect.top + tRect.height / 2;
                const deltaX = viewportCenterX - initialTCenterX;
                const deltaY = viewportCenterY - initialTCenterY;

                // Set GSAP initial values
                gsap.set(word, { transformOrigin: `${originX}px ${originY}px`, scale: 1, opacity: 1, x: 0, y: 0 });
                gsap.set(content, { opacity: 0, scale: 0.9, y: 50, pointerEvents: 'none' });

                // Pin the section and animate zoom in on scroll
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: '+=150%', // Scroll distance for zoom effect
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                });

                tl.to(word, {
                    scale: 100, // Zoom deep into the letter "T"
                    x: deltaX,
                    y: deltaY,
                    opacity: 0,
                    ease: 'power2.in'
                }).to(
                    content,
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        pointerEvents: 'auto',
                        ease: 'power2.in'
                    },
                    0.25
                ); // Fade in content card as word zooms past
            }
        });

        // Mobile: normal block layout layout resets
        mm.add('(max-width: 767px)', () => {
            const word = wordRef.current;
            const content = contentRef.current;
            if (word && content) {
                gsap.set([word, content], { clearProps: 'all' });
            }
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="sec-about-me w-screen h-screen relative overflow-hidden flex items-center justify-center max-md:h-auto max-md:py-16"
            id="achive"
        >
            {/* Desktop Large Zooming Text (fully white text, zoom into 'T') */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none md:flex hidden">
                <h1
                    ref={wordRef}
                    className="text-center font-black uppercase text-white select-none text-[12vw] tracking-wider leading-none"
                >
                    Giới <span className="zoom-t inline-block text-white">t</span>hiệu
                </h1>
            </div>

            {/* Content Container (centered absolutely on desktop, static on mobile) */}
            <div className="flex items-center text-center justify-center z-20 w-full px-4 md:absolute md:inset-0 max-md:static">
                <div
                    ref={contentRef}
                    className="about-content-card w-full max-w-[1000px] rounded-3xl backdrop-blur-md flex flex-col gap-8"
                >
                    {/* Mobile Header (only visible on mobile since large text is hidden) */}
                    <div className="md:hidden">
                        <Heading title="Giới thiệu" classTitle="title-pri" classCustom="mb-4 text-left" />
                    </div>

                    <p className="desc text-5xl text-center leading-[160%] text-white font-medium max-lg:text-3xl max-md:text-2xl">
                        Trước hết, hãy để tôi tự giới thiệu. Tôi là một lập trình viên front-end tự học, không có bằng
                        đại học. Nhờ những nỗ lực phi thường của mình, tôi đã đạt được những gì tôi có ngày hôm nay. Tôi
                        hy vọng rằng hoàn cảnh xuất phát điểm của tôi không phải là rào cản, mà là động lực thúc đẩy tôi
                        không ngừng phát triển.
                    </p>

                    <div className="achive-list-wrap w-full mt-4">
                        <div className="achive-list flex flex-wrap">
                            {achives.map((item, index) => (
                                <div className="achive-col" key={index}>
                                    <AchiveItem dataUnit={item.dataUnit} number={item.numberAchive} text={item.text} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
