'use client';
import { motion, MotionProps } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import React from 'react';

interface MotionIfProps extends MotionProps {
    children: React.ReactNode;
    as?: React.ElementType;
    className?: string;
}

export default function MotionIf({ children, as: Tag = 'div', ...motionProps }: MotionIfProps) {
    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 991 });

    // Đảm bảo chỉ render sau khi client đã mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Tránh hydration mismatch bằng cách render rỗng ban đầu
        return null;
    }

    if (isMobile) {
        // Mobile → render thẻ thường, KHÔNG animation
        return React.createElement(Tag, { className: motionProps.className }, children);
    }

    // Desktop → render motion
    const MotionTag = motion(Tag as React.ElementType);
    return <MotionTag {...motionProps}>{children}</MotionTag>;
}
