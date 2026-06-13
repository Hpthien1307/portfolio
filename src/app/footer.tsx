'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Socials from './components/socials/socials';
import MenuNav from './nav/MenuNav';
import Heading from './components/heading/heading';

export default function Footer() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                type: 'error',
                message: 'Vui lòng điền đầy đủ các thông tin bắt buộc (Họ tên, Email, Lời nhắn).'
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            let res;
            let data;
            const publicWeb3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

            if (publicWeb3FormsKey) {
                // Submit directly to Web3Forms from browser to bypass server-side Cloudflare challenges
                res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: publicWeb3FormsKey,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone || 'Không cung cấp',
                        subject: formData.subject ? `[Portfolio] ${formData.subject}` : `Tin nhắn mới từ ${formData.name}`,
                        message: formData.message,
                        to: 'hpthien1307@gmail.com'
                    })
                });
                data = await res.json();
            } else {
                // Fall back to server-side API route
                res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                data = await res.json();
            }

            if (res.ok && (data.success || data.id)) {
                setStatus({
                    type: 'success',
                    message: data.message || 'Tin nhắn của bạn đã được gửi thành công!'
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                setStatus({
                    type: 'error',
                    message: data.error || data.message || 'Đã xảy ra lỗi khi gửi tin nhắn.'
                });
            }
        } catch (error) {
            console.error(error);
            setStatus({
                type: 'error',
                message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="ft relative" id="contact">
            <div className="bg-ab">
                <Image src="images/bg-ft.jpg" alt="bg_ft" width={1728} height={835} />
            </div>
            <div className="container">
                <div className="ft-wrap py-20 lg:py-32 flex flex-col gap-y-10">
                    <Heading title="Liên hệ" classTitle="title-pri" />
                    
                    <div className="ft-columns flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch justify-between w-full mt-4">
                        {/* Left Column: Contact Form */}
                        <div className="contact-form-wrapper w-full lg:w-[54%]">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <h3 className="form-title text-3xl font-semibold mb-3 cl-blue">Gửi tin nhắn</h3>
                                <p className="form-subtitle text-white/50 text-xl mb-8 font-light">
                                    Nếu bạn có câu hỏi hoặc cơ hội hợp tác phát triển, hãy để lại lời nhắn bên dưới nhé.
                                </p>
                                
                                {status.message && (
                                    <div className={`form-alert p-5 rounded-lg mb-6 text-xl font-medium transition-all ${
                                        status.type === 'success' 
                                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    }`}>
                                        {status.message}
                                    </div>
                                )}
                                
                                <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="form-group flex flex-col gap-2">
                                        <label htmlFor="name" className="text-xl font-medium text-white/80">Họ tên *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nguyễn Văn A"
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    
                                    <div className="form-group flex flex-col gap-2">
                                        <label htmlFor="email" className="text-xl font-medium text-white/80">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="nguyenvana@gmail.com"
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    
                                    <div className="form-group flex flex-col gap-2">
                                        <label htmlFor="phone" className="text-xl font-medium text-white/80">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="09xxxxxxxx"
                                            className="form-input"
                                        />
                                    </div>
                                    
                                    <div className="form-group flex flex-col gap-2">
                                        <label htmlFor="subject" className="text-xl font-medium text-white/80">Tiêu đề</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Hợp tác dự án..."
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group flex flex-col gap-2 mb-8">
                                    <label htmlFor="message" className="text-xl font-medium text-white/80">Lời nhắn *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Nội dung lời nhắn của bạn gửi đến mình..."
                                        rows={4}
                                        required
                                        className="form-textarea"
                                    />
                                </div>
                                
                                <div className="form-submit">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="btn btn-pri border-ln w-full py-4 text-center cursor-pointer select-none font-semibold text-2xl flex items-center justify-center gap-3 transition-all"
                                    >
                                        <span className="txt text-white">
                                            {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Contact Information */}
                        <div className="contact-info-wrapper w-full lg:w-[40%] flex flex-col justify-between gap-y-12">
                            <div className="info-details flex flex-col">
                                <div className="ft-logo mb-8">
                                    <Link href="./" className="custom-logo-link">
                                        <Image src="images/logo.png" alt="logo" width={133} height={38} />
                                    </Link>
                                </div>
                                
                                <p className="info-desc text-white/75 leading-relaxed text-2xl font-light mb-12">
                                    Cảm ơn bạn đã dành thời gian ghé xem portfolio của mình. Hãy liên hệ với mình qua các kênh bên dưới hoặc điền form để gửi email trực tiếp nhé. Mình sẽ trả lời sớm nhất có thể!
                                </p>
                                
                                <div className="ft-info-list flex flex-col gap-y-10">
                                    <div className="content-info">
                                        <p className="tt flex items-center gap-4 font-semibold text-3xl mb-6 cl-blue">
                                            Thông tin liên hệ
                                        </p>
                                        <ul className="menu-list flex flex-col gap-5">
                                            <li className="menu-item font-semibold flex gap-4 items-center">
                                                <Image
                                                    src="images/phone-call.png"
                                                    alt="phone-call"
                                                    width={24}
                                                    height={24}
                                                />
                                                <Link
                                                    className="menu-link text-2xl font-medium text-white/90 hover:cl-pri transition-all"
                                                    href="https://zalo.me/0773188858"
                                                    target="_blank"
                                                >
                                                    Zalo / Phone: 0773188858
                                                </Link>
                                            </li>
                                            <li className="menu-item font-semibold flex gap-4 items-center">
                                                <Image src="images/gmail.png" alt="mail" width={24} height={24} />
                                                <Link
                                                    className="menu-link text-2xl font-medium text-white/90 hover:cl-pri transition-all"
                                                    href="mailto:hpthien1307@gmail.com"
                                                    target="_blank"
                                                >
                                                    Email: hpthien1307@gmail.com
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="content-info">
                                        <p className="tt flex items-center gap-4 font-semibold text-3xl mb-4 cl-blue">
                                            Socials
                                        </p>
                                        <Socials classCustom="mt-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="ft-menu border-t border-white/10 pt-10 mt-auto">
                                <MenuNav />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
