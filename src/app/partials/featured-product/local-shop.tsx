'use client';

import React, { useState, useEffect, useRef } from 'react';
import Heading from '../../components/heading/heading';
import { ShoppingBag, Sliders, Database, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type TabType = 'overview' | 'storefront' | 'admin' | 'backend';

export default function LocalShopShowcase() {
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
        { id: 'storefront' as TabType, label: 'Cửa Hàng', icon: ShoppingBag },
        { id: 'admin' as TabType, label: 'Trang Admin', icon: Sliders },
        { id: 'backend' as TabType, label: 'Máy Chủ Backend', icon: Database }
    ];

    const techBadges: Record<TabType, string[]> = {
        overview: ['React', 'Node.js', 'Express', 'MongoDB', 'Vite', 'TailwindCSS v4', 'JWT'],
        storefront: ['React', 'Vite', 'TailwindCSS v4', 'Swiper', 'Radix UI', 'Axios'],
        admin: ['React', 'Vite', 'Radix UI', 'TailwindCSS', 'React Hook Form', 'Zod'],
        backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT Auth', 'Bcrypt']
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
            title: 'Nền tảng E-commerce Toàn diện (Full-Stack)',
            desc: 'Local-shop là một hệ sinh thái thương mại điện tử đồng bộ, được xây dựng hoàn chỉnh từ giao diện mua sắm tiện lợi cho khách hàng đến hệ thống quản lý kho hàng, đơn hàng thông minh cho quản trị viên và máy chủ bảo mật.',
            bullets: [
                'Kiến trúc tách biệt Frontend Storefront, Admin Panel và RESTful API Backend.',
                'Đồng bộ hóa trạng thái mua sắm thời gian thực với tính năng bảo mật tài khoản tuyệt đối.',
                'Hệ thống quản lý dữ liệu linh hoạt, tối ưu hóa tốc độ tải trang chỉ dưới 1.5 giây.'
            ]
        },
        storefront: {
            title: 'Giao diện Khách hàng Mượt mà & Hiện đại',
            desc: 'Trang mua sắm ứng dụng triết lý thiết kế tối giản, tập trung vào trải nghiệm khách hàng với tốc độ phản hồi tức thì và hiệu ứng chuyển động mượt mà.',
            bullets: [
                'Bộ lọc tìm kiếm đa tầng theo danh mục, khoảng giá và thương hiệu với phản hồi tức thì.',
                'Giỏ hàng ứng dụng React Context quản lý trạng thái đồng bộ, tối ưu hóa thao tác người dùng.',
                'Trang chi tiết sản phẩm tích hợp thư viện trình diễn slide ảnh cao cấp và chế độ xem phóng to.'
            ]
        },
        admin: {
            title: 'Hệ thống Quản trị Cửa hàng Toàn năng',
            desc: 'Bảng điều khiển trực quan giúp chủ cửa hàng dễ dàng theo dõi doanh thu, xử lý đơn hàng và quản lý toàn bộ vòng đời sản phẩm.',
            bullets: [
                'Báo cáo doanh số và đơn hàng trực quan dưới dạng biểu đồ dữ liệu thống kê.',
                'Quy trình quản lý sản phẩm (CRUD) hoàn chỉnh với trình soạn thảo văn bản mô tả giàu định dạng (Rich Text).',
                'Quản lý danh sách người dùng và cập nhật trạng thái đơn hàng (Đang xử lý, Đang giao, Đã giao) chuẩn xác.'
            ]
        },
        backend: {
            title: 'Máy chủ RESTful API Mạnh mẽ & Bảo mật',
            desc: 'Trái tim của hệ thống xử lý logic nghiệp vụ phức tạp, bảo mật thông tin và cung cấp dữ liệu hiệu năng cao.',
            bullets: [
                'Hệ thống phân quyền truy cập nâng cao (RBAC) sử dụng cơ chế JWT Access & Refresh Token.',
                'Bảo mật thông tin đăng nhập với thuật toán mã hóa mật mã mật khẩu một chiều Bcrypt.',
                'Thiết lập CORS chặt chẽ ngăn chặn truy cập trái phép từ bên ngoài và kết nối MongoDB an toàn thông qua Mongoose ORM.'
            ]
        }
    };

    return (
        <section className="sec-featured-product ss-pd-b relative overflow-hidden" id="localshop" ref={containerRef}>
            <div className="container">
                {/* Section Header */}
                <div className="animate-fade">
                    <Heading title="Dự án cá nhân" classTitle="title-pri" classCustom="mb-16 text-center" />
                </div>

                {/* Main Card Grid */}
                <div className="animate-fade localshop-card w-full rounded-3xl border-ln bg-white/5 backdrop-blur-md p-12 max-lg:p-8 max-md:p-6 flex flex-col gap-10">
                    {/* Head Title & Links */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
                        <div>
                            <span className="text-xl font-bold uppercase tracking-widest text-blue-400">
                                Sản phẩm cá nhân
                            </span>
                            <h3 className="text-5xl font-black text-white mt-2 max-md:text-4xl">Local-Shop Platform</h3>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://localshop-frontend-orcin.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-featured-visit flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg transition-all"
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
                                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
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
                                    <Sparkles className="text-blue-400" size={24} />
                                    <span>{tabDetails[activeTab].title}</span>
                                </h4>

                                <p className="text-2xl leading-[160%] text-white/80 font-medium">
                                    {tabDetails[activeTab].desc}
                                </p>

                                {/* Bullet points */}
                                <ul className="flex flex-col gap-4">
                                    {tabDetails[activeTab].bullets.map((bullet, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-xl text-white/70">
                                            <CheckCircle2 className="text-blue-400 mt-1 shrink-0" size={18} />
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
                                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/90 text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-colors"
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
                                className="localshop-preview-container w-full aspect-[4/3] rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative shadow-2xl shadow-blue-500/5 flex flex-col"
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
                                            ? 'api/controllers/auth.controller.js'
                                            : activeTab === 'admin'
                                              ? 'localhost:5174/admin/dashboard'
                                              : 'localshop-frontend.vercel.app/'}
                                    </div>
                                    <div className="w-8" />
                                </div>

                                {/* Tab-Specific Visual Image Preview */}
                                <div className="flex-grow relative overflow-hidden bg-black/20 flex items-center justify-center">
                                    <Image
                                        src={
                                            activeTab === 'overview'
                                                ? '/images/localshop_overview.png'
                                                : activeTab === 'storefront'
                                                  ? '/images/localshop_storefront.png'
                                                  : activeTab === 'admin'
                                                    ? '/images/localshop_admin.png'
                                                    : '/images/localshop_backend.png'
                                        }
                                        alt={activeTab}
                                        fill
                                        className="object-contain animate-fade-in"
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
