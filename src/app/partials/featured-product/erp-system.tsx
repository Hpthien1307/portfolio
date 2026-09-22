'use client';

import React, { useState, useEffect, useRef } from 'react';
import Heading from '../../components/heading/heading';
import { ClipboardList, Database, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'overview' | 'workspace' | 'backend';

export default function ErpSystemShowcase() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

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
        { id: 'workspace' as TabType, label: 'Giao Diện Làm Việc', icon: ClipboardList },
        { id: 'backend' as TabType, label: 'Hệ Thống & Bảo Mật', icon: Database }
    ];

    const techBadges: Record<TabType, string[]> = {
        overview: [
            'React + Vite',
            'TypeScript',
            'Express.js',
            'PostgreSQL',
            'Prisma ORM',
            'Supabase',
            'Socket.io',
            'Tailwind CSS',
            'React Query',
            'Zustand'
        ],
        workspace: [
            'React + Vite',
            'TypeScript',
            'Tailwind CSS',
            'React Query',
            'React Hook Form',
            'Zod',
            'Recharts',
            'Zustand'
        ],
        backend: [
            'Express.js',
            'PostgreSQL',
            'TypeScript',
            'Prisma ORM',
            'Supabase',
            'JWT & Refresh Token',
            'Socket.io'
        ]
    };

    const tabDetails: Record<TabType, { title: string; desc: string; bullets: string[] }> = {
        overview: {
            title: 'Hệ Thống ERP Quản Lý Nhân Sự & Công Việc',
            desc: 'Hệ thống ERP nội bộ giúp doanh nghiệp quản lý chấm công, phê duyệt đơn từ, phân bổ công việc theo phòng ban và theo dõi hiệu suất nhân viên qua bảng điều khiển trực quan — phân quyền rõ ràng theo 3 cấp Nhân viên, Quản lý và Quản trị viên.',
            bullets: [
                'Chấm công vào/ra theo thời gian thực, tự động tính giờ làm, phát hiện đi trễ và tổng hợp thống kê theo tháng.',
                'Quy trình phê duyệt đơn từ (nghỉ phép, làm từ xa, tăng ca) với thông báo tức thời qua Socket.io cho quản lý phụ trách.',
                'Bảng điều khiển trực quan hóa dữ liệu bằng Recharts, cho phép quản lý lọc xem hiệu suất theo từng nhân viên trong phòng ban.'
            ]
        },
        workspace: {
            title: 'Giao Diện Quản Lý Công Việc & Đơn Từ',
            desc: 'Giao diện được thiết kế theo hướng rõ ràng, tối ưu cho thao tác lặp lại hằng ngày như chấm công, tạo đơn và cập nhật tiến độ công việc, với phân trang và bộ lọc xử lý hoàn toàn phía máy chủ để đảm bảo hiệu năng khi dữ liệu tăng trưởng.',
            bullets: [
                'Quản lý công việc theo phòng ban với phân quyền chỉnh sửa: nhân viên chỉ cập nhật trạng thái task của mình, quản lý toàn quyền chỉnh sửa.',
                'Form nhập liệu chuẩn hóa với React Hook Form và Zod, kèm rich text editor cho các trường mô tả và tiểu sử cá nhân.',
                'Phân trang, tìm kiếm và lọc dữ liệu đồng bộ hai chiều với API, tránh sai lệch số liệu khi kết hợp nhiều điều kiện lọc cùng lúc.'
            ]
        },
        backend: {
            title: 'Kiến Trúc Backend Bảo Mật & Đáng Tin Cậy',
            desc: 'Backend xây dựng trên Express.js và TypeScript, ưu tiên tách lớp service riêng biệt để tái sử dụng logic nghiệp vụ, cùng cơ chế xác thực an toàn chống giả mạo phiên đăng nhập.',
            bullets: [
                'Xác thực bằng JWT access token ngắn hạn kết hợp refresh token rotation, lưu trong HttpOnly cookie để hạn chế tấn công XSS.',
                'Quản lý dữ liệu quan hệ PostgreSQL qua Prisma ORM, triển khai trên Supabase với kết nối pooled cho runtime và direct connection riêng cho migration.',
                'Phân quyền chặt chẽ ở cả hai lớp: middleware kiểm tra vai trò ở tầng route, và kiểm tra quyền sở hữu dữ liệu ngay trong từng controller.'
            ]
        }
    };

    return (
        <section className="sec-featured-product ss-pd-b relative overflow-hidden" id="erp" ref={containerRef}>
            <div className="container">
                <div className="animate-fade">
                    <Heading title="Dự án nổi bật" classTitle="title-pri" classCustom="mb-16 text-center" />
                </div>

                <div className="animate-fade hptmenu-card w-full rounded-3xl border-ln bg-white/5 backdrop-blur-md p-12 max-lg:p-8 max-md:p-6 flex flex-col gap-10">
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
                        <div>
                            <span className="text-xl font-bold uppercase tracking-widest text-emerald-400">
                                Sản phẩm nổi bật
                            </span>
                            <h3 className="text-5xl font-black text-white mt-2 max-md:text-4xl">
                                ERP Management System
                            </h3>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://erpfrontend-eosin.vercel.app/"
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

                    <div className="grid grid-cols-12 gap-8 items-start">
                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-8">
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

                            <div ref={contentRef} className="flex flex-col gap-6">
                                <h4 className="text-3xl font-bold text-white flex items-center gap-2">
                                    <Sparkles className="text-emerald-400" size={24} />
                                    <span>{tabDetails[activeTab].title}</span>
                                </h4>

                                <p className="text-2xl leading-[160%] text-white/80 font-medium">
                                    {tabDetails[activeTab].desc}
                                </p>

                                <ul className="flex flex-col gap-4">
                                    {tabDetails[activeTab].bullets.map((bullet, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-xl text-white/70">
                                            <CheckCircle2 className="text-emerald-400 mt-1 shrink-0" size={18} />
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

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

                        <div className="col-span-12 lg:col-span-6">
                            <div
                                ref={previewRef}
                                className="hptmenu-preview-container w-full aspect-[4/3] rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative shadow-2xl shadow-emerald-500/5 flex flex-col"
                            >
                                <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between select-none">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                    </div>
                                    <div className="text-sm text-white/40 font-mono select-none px-4 py-0.5 rounded bg-black/25 w-[50%] text-center overflow-hidden text-ellipsis whitespace-nowrap">
                                        {activeTab === 'backend'
                                            ? 'erp-backend/src/controllers/task.controller.ts'
                                            : 'erpfrontend-eosin.vercel.app/'}
                                    </div>
                                    <div className="w-8" />
                                </div>

                                <div className="flex-grow relative overflow-hidden bg-black/20 flex items-center justify-center">
                                    <Image
                                        src={
                                            activeTab === 'overview'
                                                ? '/images/erp-1.png'
                                                : activeTab === 'workspace'
                                                  ? '/images/erp-2.png'
                                                  : '/images/erp-3.png'
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
