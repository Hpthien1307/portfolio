'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { skills } from './skill-list';
import Heading from '../../components/heading/heading';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsVelocity() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop: horizontal scroll pinning
        mm.add('(min-width: 768px)', () => {
            const section = sectionRef.current;
            const track = trackRef.current;

            if (section && track) {
                // Initialize track translated completely to the right (offscreen)
                gsap.set(track, { x: '100vw' });

                // Skew effect on scroll using gsap.quickTo for high performance and smooth animation
                const clamp = gsap.utils.clamp(-30, 30); // clamp skew between -10 and 10 degrees
                const skewTo = gsap.quickTo(track, 'skewX', {
                    duration: 0.4,
                    ease: 'power3.out'
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${track.scrollWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: self => {
                            const skew = clamp(self.getVelocity() / -300);
                            skewTo(skew);
                        }
                    }
                });

                tl.to(track, {
                    x: () => {
                        // End when the last card is aligned to the right edge with 48px padding
                        return window.innerWidth - track.scrollWidth - 48;
                    },
                    ease: 'none'
                });
            }
        });

        // Mobile: clear props, native swipe scrolling
        mm.add('(max-width: 767px)', () => {
            const track = trackRef.current;
            if (track) {
                gsap.set(track, { clearProps: 'all' });
            }
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="sec-skill-horizontal w-screen relative h-screen overflow-hidden pt-28 pb-8 flex flex-col max-md:h-auto max-md:pt-16 max-md:pb-6"
        >
            {/* Heading aligned to container - pt-28 ensures it is below the sticky nav header */}
            <div className="sec-skill-wrap flex flex-col h-full">
                <Heading title="Các kĩ năng" classTitle="title-pri" />

                {/* Horizontal scroll track wrapper (centered vertically in remaining space) */}
                <div className="w-full flex-grow flex items-center justify-center overflow-hidden py-4">
                    <div
                        ref={trackRef}
                        className="skills-track flex gap-8 px-12 max-md:px-4 max-md:overflow-x-auto max-md:whitespace-nowrap max-md:w-full max-md:snap-x max-md:snap-mandatory"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="skill-card border-ln flex flex-col items-center justify-center shrink-0 min-w-[320px] h-[380px] gap-6 max-md:min-w-[260px] max-md:h-[320px] max-md:snap-center"
                            >
                                <div className="icon w-24 h-24 shrink-0 flex items-center justify-center max-md:w-16 max-md:h-16">
                                    <Image
                                        src={`images/${skill.icon}`}
                                        alt={skill.text}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-contain brightness-0 invert opacity-80"
                                    />
                                </div>
                                <h3 className="text-4xl font-bold text-white max-md:text-3xl text-center">
                                    {skill.text}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
