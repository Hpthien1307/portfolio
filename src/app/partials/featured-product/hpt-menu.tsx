'use client';

import React, { useState, useEffect, useRef } from 'react';
import Heading from '../../components/heading/heading';
import { ShoppingBag, Database, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'overview' | 'storefront' | 'backend';

export default function HptMenuShowcase() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // Fade-in animation on scroll
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            gsap.fromTo(
                container.querySelectorAll('.animate-fade'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }, []);

    // Animate tab switches
    useEffect(() => {
        if (contentRef.current && previewRef.current) {
            gsap.fromTo(
                [contentRef.current, previewRef.current],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
            );
        }
    }, [activeTab]);

    const tabs = [
        { id: 'overview' as TabType, label: 'Tổng Quan', icon: Sparkles },
        { id: 'storefront' as TabType, label: 'Giao Diện Gọi Món', icon: ShoppingBag },
        { id: 'backend' as TabType, label: 'Hệ Thống & AI', icon: Database }
    ];

    const techBadges: Record<TabType, string[]> = {
        overview: [
            'React + Vite',
            'TypeScript',
            'NestJS',
            'PostgreSQL',
            'Prisma',
            'Supabase',
            'Google AI Studio',
            'Tailwind CSS',
            'React Query',
            'Zustand'
        ],
        storefront: ['React + Vite', 'TypeScript', 'Tailwind CSS', 'React Query', 'React Hook Form', 'Zod', 'Zustand'],
        backend: ['NestJS', 'PostgreSQL', 'TypeScript', 'Prisma Schema', 'Supabase', 'Google Studio API']
    };

    const tabDetails: Record<
        TabType,
        {
            title: string;
            desc: string;
            bullets: string[];
        }
    > = {
        overview: {
            title: 'Hệ Thống Gọi Món Gọi Món Thông Minh Qua QR Code',
            desc: 'HPT Menu là giải pháp đặt món tối ưu dành cho các quán ăn và nhà hàng. Bằng việc ứng dụng mã QR định danh theo từng bàn, hệ thống tối ưu hóa quy trình vận hành và mang lại sự tiện ích tối đa cho thực khách.',
            bullets: [
                'Gọi món trực tiếp tại bàn bằng cách quét mã QR độc bản, không cần tải ứng dụng hay qua trung gian.',
                'Tích hợp trợ lý AI thông minh qua Google Gemini API hỗ trợ tư vấn món ăn và giải đáp thực đơn trực tiếp.',
                'Đồng bộ dữ liệu thời gian thực giữa thiết bị của khách hàng và hệ thống phục vụ/bếp qua Supabase Realtime.'
            ]
        },
        storefront: {
            title: 'Giao Diện Khách Hàng Thân Thiện & Phản Hồi Tức Thì',
            desc: 'Ứng dụng khách hàng được tối ưu hóa hiển thị trên mọi thiết bị di động, mang lại trải nghiệm đặt món nhanh gọn và trực quan.',
            bullets: [
                'Menu hiển thị thông minh theo danh mục, hỗ trợ tìm kiếm nhanh và hiển thị chi tiết nguyên liệu món ăn.',
                'Giỏ hàng quản lý trạng thái mượt mà bằng Zustand, tự động lưu thông tin bàn và cập nhật hóa đơn.',
                'Quy trình nhập thông tin và lưu ý đơn hàng chuẩn hóa với React Hook Form và Zod validator.'
            ]
        },
        backend: {
            title: 'Hệ Thống Core Backend Chắc Chắn & Trí Tuệ Nhân Tạo',
            desc: 'Kiến trúc máy chủ NestJS mạnh mẽ đảm bảo bảo mật, xử lý dữ liệu nhất quán và tích hợp linh hoạt các dịch vụ đám mây.',
            bullets: [
                'Backend sử dụng NestJS & TypeScript với cấu trúc module chuyên nghiệp, dễ dàng mở rộng và bảo trì.',
                'Quản lý dữ liệu quan hệ PostgreSQL tối ưu thông qua Prisma ORM, đảm bảo tính toàn vẹn dữ liệu.',
                'Kết nối Google AI Studio (Gemini API) để xử lý ngôn ngữ tự nhiên và Supabase để đồng bộ hóa trạng thái đơn hàng.'
            ]
        }
    };

    return (
        <section className="sec-featured-product ss-pd-b relative overflow-hidden" id="hptmenu" ref={containerRef}>
            <div className="container">
                {/* Section Header */}
                <div className="animate-fade">
                    <Heading title="Dự án nổi bật" classTitle="title-pri" classCustom="mb-16 text-center" />
                </div>

                {/* Main Card Grid */}
                <div className="animate-fade hptmenu-card w-full rounded-3xl border-ln bg-white/5 backdrop-blur-md p-12 max-lg:p-8 max-md:p-6 flex flex-col gap-10">
                    {/* Head Title & Links */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
                        <div>
                            <span className="text-xl font-bold uppercase tracking-widest text-emerald-400">
                                Sản phẩm nổi bật
                            </span>
                            <h3 className="text-5xl font-black text-white mt-2 max-md:text-4xl">HPT Menu Platform</h3>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://htp-menu-frontend.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-featured-visit flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg transition-all"
                                style={{ boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)' }}
                            >
                                <ExternalLink size={20} />
                                <span>Trải nghiệm Web</span>
                            </a>
                        </div>
                    </div>

                    {/* Content Columns */}
                    <div className="grid grid-cols-12 gap-8 items-start">
                        {/* Left Column: Selector & Text details */}
                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-8">
                            {/* Tabs selector */}
                            <div className="flex flex-wrap gap-3 p-2 rounded-2xl bg-white/5 border border-white/5">
                                {tabs.map(tab => {
                                    const IconComponent = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-lg transition-all ${
                                                isActive
                                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <IconComponent size={18} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Details display */}
                            <div ref={contentRef} className="flex flex-col gap-6">
                                <h4 className="text-3xl font-bold text-white flex items-center gap-2">
                                    <Sparkles className="text-emerald-400" size={24} />
                                    <span>{tabDetails[activeTab].title}</span>
                                </h4>

                                <p className="text-2xl leading-[160%] text-white/80 font-medium">
                                    {tabDetails[activeTab].desc}
                                </p>

                                {/* Bullet points */}
                                <ul className="flex flex-col gap-4">
                                    {tabDetails[activeTab].bullets.map((bullet, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-xl text-white/70">
                                            <CheckCircle2 className="text-emerald-400 mt-1 shrink-0" size={18} />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech stack badges */}
                                <div className="mt-4">
                                    <p className="text-lg font-bold uppercase tracking-wider text-white/40 mb-3">
                                        Công nghệ cốt lõi
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {techBadges[activeTab].map(tech => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/90 text-lg font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visual Mockup / Code View */}
                        <div className="col-span-12 lg:col-span-6">
                            <div
                                ref={previewRef}
                                className="hptmenu-preview-container w-full aspect-[4/3] rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative shadow-2xl shadow-emerald-500/5 flex flex-col"
                            >
                                {/* Browser Mockup Header */}
                                <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between select-none">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                    </div>
                                    <div className="text-sm text-white/40 font-mono select-none px-4 py-0.5 rounded bg-black/25 w-[50%] text-center overflow-hidden text-ellipsis whitespace-nowrap">
                                        {activeTab === 'backend'
                                            ? 'nestjs/src/modules/products/product.controller.ts'
                                            : 'htp-menu-frontend.vercel.app/'}
                                    </div>
                                    <div className="w-8" />
                                </div>

                                {/* Tab-Specific Visual Image Preview */}
                                <div className="flex-grow relative overflow-hidden bg-black/20 flex items-center justify-center">
                                    <Image
                                        src={
                                            activeTab === 'overview'
                                                ? '/images/hpt-menu-1.png'
                                                : activeTab === 'storefront'
                                                  ? '/images/hpt-menu-2.png'
                                                  : '/images/localshop_backend.png'
                                        }
                                        alt={activeTab}
                                        fill
                                        className="object-cover animate-fade-in"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
