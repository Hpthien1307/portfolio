'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticWrapperProps {
    children: React.ReactElement;
    className?: string;
    range?: number; // Distance multiplier for the effect
}

export default function MagneticWrapper({ children, className = '', range = 0.35 }: MagneticWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        
        // Calculate center of target element
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Calculate offset from center
        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;

        // Apply smooth magnetic translation
        gsap.to(container, {
            x: offsetX * range,
            y: offsetY * range,
            duration: 0.3,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        if (!container) return;

        // Reset to original position smoothly with elastic bounce back
        gsap.to(container, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`magnetic-wrapper inline-block ${className}`}
        >
            {children}
        </div>
    );
}
