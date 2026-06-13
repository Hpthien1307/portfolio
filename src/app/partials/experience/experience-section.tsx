'use client';

import React, { useEffect, useRef } from 'react';
import Heading from '../../components/heading/heading';
import { experiences } from './experience-list';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '../../components/magnetic-wrapper';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const cardLeftRef = useRef<HTMLDivElement>(null);
    const cardRightRef = useRef<HTMLDivElement>(null);
    const centerLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = timelineRef.current;
        const cardLeft = cardLeftRef.current;
        const cardRight = cardRightRef.current;
        const centerLine = centerLineRef.current;

        const mm = gsap.matchMedia();

        // Desktop animation: Stacked -> Split on scroll
        mm.add('(min-width: 768px)', () => {
            if (timeline && cardLeft && cardRight) {
                // Initialize stacked states
                gsap.set(cardLeft, {
                    xPercent: -50,
                    yPercent: -50,
                    left: '50%',
                    top: '50%',
                    position: 'absolute',
                    rotate: -3,
                    scale: 0.95
                });
                gsap.set(cardRight, {
                    xPercent: -50,
                    yPercent: -50,
                    left: '50%',
                    top: '50%',
                    position: 'absolute',
                    rotate: 3,
                    scale: 0.95
                });
                if (centerLine) {
                    gsap.set(centerLine, { scaleY: 0, transformOrigin: 'top' });
                }

                // ScrollTrigger timeline for pinning and splitting
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: timeline,
                        start: 'top 15%',
                        end: '+=90%',
                        scrub: 1.2,
                        pin: true,
                        anticipatePin: 1
                    }
                });

                tl.to(cardLeft, {
                    xPercent: -112,
                    rotate: 0,
                    scale: 1,
                    ease: 'power2.in'
                }).to(
                    cardRight,
                    {
                        xPercent: 12,
                        rotate: 0,
                        scale: 1,
                        ease: 'power2.in'
                    },
                    0
                ); // Animate at the same time

                if (centerLine) {
                    tl.to(
                        centerLine,
                        {
                            scaleY: 1,
                            ease: 'power2.in'
                        },
                        0
                    ); // Animate center line drawing in sync with the cards
                }
            }
        });

        // Mobile animation: Simple vertical scroll reveal
        mm.add('(max-width: 767px)', () => {
            if (cardLeft && cardRight) {
                // Reset positions for normal block layout on mobile
                gsap.set([cardLeft, cardRight], { clearProps: 'all' });
                if (centerLine) {
                    gsap.set(centerLine, { clearProps: 'all' });
                }

                gsap.fromTo(
                    [cardLeft, cardRight],
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.25,
                        duration: 0.4,
                        ease: 'power3.in',
                        scrollTrigger: {
                            trigger: timeline,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section className="sec-experience ss-pd-b" id="experience">
            <div className="container">
                <div className="experience-wrap">
                    <Heading title="Kinh nghiệm làm việc" classTitle="title-pri" classCustom="mb-16" />

                    <div className="timeline-container relative" ref={timelineRef}>
                        {/* Center vertical lines (visible on desktop) */}
                        <div className="timeline-line-bg absolute left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-1/2 max-md:hidden"></div>
                        <div
                            className="timeline-line absolute left-1/2 top-4 bottom-4 w-[2px] origin-top max-md:hidden"
                            ref={centerLineRef}
                        ></div>

                        <div
                            className="split-wrapper relative w-full mx-auto max-md:flex max-md:flex-col max-md:gap-8 max-md:px-4"
                            style={{ minHeight: '600px' }}
                        >
                            {/* Card 1: Mona Media (Left Card) */}
                            <div
                                className="card-wrapper w-[45%] max-w-[500px] max-md:w-full max-md:max-w-none max-md:static"
                                ref={cardLeftRef}
                            >
                                <div className="experience-card p-8 rounded-2xl border-ln text-left h-full">
                                    <span className="exp-duration text-xl font-bold tracking-wider opacity-60 block mb-2">
                                        {experiences[0].duration}
                                    </span>
                                    <h3 className="exp-company text-3xl font-bold text-white mb-1">
                                        {experiences[0].company}
                                    </h3>
                                    <h4 className="exp-position text-xl font-semibold cl-pri mb-6">
                                        {experiences[0].position}
                                    </h4>

                                    <ul className="exp-tasks flex flex-col gap-3 mb-6 opacity-80 pl-4 list-disc text-2xl">
                                        {experiences[0].tasks.map((task, i) => (
                                            <li key={i} className="leading-relaxed">
                                                {task}
                                            </li>
                                        ))}
                                    </ul>

                                    {experiences[0].projects && experiences[0].projects.length > 0 && (
                                        <div className="exp-projects mb-6">
                                            <h5 className="text-lg font-semibold text-white/90 mb-3">Dự án nổi bật:</h5>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                                {experiences[0].projects.map((proj, i) => (
                                                    <MagneticWrapper key={i} range={0.15}>
                                                        <a
                                                            href={proj.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="project-link text-base cl-blue hover:text-white underline font-medium inline-block"
                                                        >
                                                            + {proj.name}
                                                        </a>
                                                    </MagneticWrapper>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="exp-tools border-t border-white/10 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {experiences[0].tools.map((tool, i) => (
                                                <span
                                                    key={i}
                                                    className="tool-tag text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Namtech (Right Card) */}
                            <div
                                className="card-wrapper w-[45%] max-w-[500px] max-md:w-full max-md:max-w-none max-md:static"
                                ref={cardRightRef}
                            >
                                <div className="experience-card p-8 rounded-2xl border-ln text-left h-full">
                                    <span className="exp-duration text-xl font-bold tracking-wider opacity-60 block mb-2">
                                        {experiences[1].duration}
                                    </span>
                                    <h3 className="exp-company text-3xl font-bold text-white mb-1">
                                        {experiences[1].company}
                                    </h3>
                                    <h4 className="exp-position text-xl font-semibold cl-pri mb-6">
                                        {experiences[1].position}
                                    </h4>

                                    <ul className="exp-tasks flex flex-col gap-3 mb-6 opacity-80 pl-4 list-disc text-2xl">
                                        {experiences[1].tasks.map((task, i) => (
                                            <li key={i} className="leading-relaxed">
                                                {task}
                                            </li>
                                        ))}
                                    </ul>

                                    {experiences[1].projects && experiences[1].projects.length > 0 && (
                                        <div className="exp-projects mb-6">
                                            <h5 className="text-lg font-semibold text-white/90 mb-3">Dự án nổi bật:</h5>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                                {experiences[1].projects.map((proj, i) => (
                                                    <MagneticWrapper key={i} range={0.15}>
                                                        <a
                                                            href={proj.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="project-link text-base cl-blue hover:text-white underline font-medium inline-block"
                                                        >
                                                            + {proj.name}
                                                        </a>
                                                    </MagneticWrapper>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="exp-tools border-t border-white/10 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {experiences[1].tools.map((tool, i) => (
                                                <span
                                                    key={i}
                                                    className="tool-tag text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
