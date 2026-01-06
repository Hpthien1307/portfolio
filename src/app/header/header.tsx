'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Btn from '../components/button/btn';
import MenuNav from '../nav/MenuNav';
import Link from 'next/link';
import { useEffect } from 'react';
import Socials from '../components/socials/socials';

export default function Header() {
    // xử lí sticky header
    useEffect(() => {
        const header = document.querySelector('.hd');
        if (!header) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > header.scrollHeight) {
                header.classList.add('hd-sticky');
            } else {
                header.classList.remove('hd-sticky');
            }
        });
    }, []);

    // xử lí active menu nav + section
    useEffect(() => {
        const menuLinks = document.querySelectorAll('.hd-nav .menu-list > .menu-item > .menu-link');
        const header = document.querySelector('.hd');

        const handleMenuClick = (e: Event) => {
            const link = e.target as HTMLAnchorElement;
            const href = link.getAttribute('href');

            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();

                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                const headerHeight = header?.scrollHeight || 0;

                if (section) {
                    const targetPosition = section.offsetTop - headerHeight - 20;

                    menuLinks.forEach(l => {
                        l.parentElement?.classList.remove('active');
                    });

                    link.parentElement?.classList.add('active');

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    const mobileMenu = document.querySelector('.mobile');
                    if (mobileMenu?.classList.contains('open')) {
                        setIsToggle(false);
                    }
                }
            }
        };

        const handleScroll = () => {
            const headerHeight = header?.scrollHeight || 0;
            let currentSectionId = '';

            menuLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    const section = document.getElementById(sectionId);

                    if (section) {
                        const sectionTop = section.offsetTop - headerHeight - 50;
                        const sectionBottom = sectionTop + section.offsetHeight;

                        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                            currentSectionId = sectionId;
                        }
                    }
                }
            });

            // Remove active từ tất cả
            menuLinks.forEach(l => {
                l.parentElement?.classList.remove('active');
            });

            // Add active cho section hiện tại
            if (currentSectionId) {
                const activeLink = document.querySelector(
                    `.hd-nav .menu-list > .menu-item > .menu-link[href="#${currentSectionId}"]`
                );
                activeLink?.parentElement?.classList.add('active');
            }
        };

        handleScroll();

        menuLinks.forEach(link => {
            link.addEventListener('click', handleMenuClick);
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            menuLinks.forEach(link => {
                link.removeEventListener('click', handleMenuClick);
                window.removeEventListener('scroll', handleScroll);
            });
        };
    }, []);

    // xử lí toggle menu
    const [isToggle, setIsToggle] = useState(false);
    const toggleMenu = () => {
        setIsToggle(!isToggle);
    };

    return (
        <header className="hd fixed top-0 left-0 w-full z-50">
            <div className="container">
                <div className="hd-wrap flex justify-between items-center gap-16 h-full">
                    <div className="hd-logo">
                        <Link href={'/'} className="custom-logo-link">
                            <Image src="images/logo.png" alt="logo" width={133} height={38} />
                        </Link>
                    </div>
                    <div className="hd-nav hidden xl:flex">
                        <MenuNav />
                    </div>
                    <div className="hd-actions flex items-center gap-x-6">
                        <div className="hd-ct">
                            <Btn className={`btn-pri border-ln`} href="https://zalo.me/0773188858">
                                <span className="txt">Liên hệ</span>
                            </Btn>
                        </div>
                        <div className={`hd-burger ${isToggle ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
                            <div className="burger-wrap">
                                <svg className="menu-svg" viewBox="0 0 100 100">
                                    <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                                    <path className="path-2" d="m 30,50 h 40"></path>
                                    <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mobile-overlay ${isToggle ? 'open' : ''}`} onClick={toggleMenu}></div>
            <div className={`mobile ${isToggle ? 'open' : ''}`}>
                <div className="mobile-con">
                    <div className="mobile-wr">
                        <div className="mobile-nav">
                            <div className="menu-nav">
                                <MenuNav />
                            </div>
                        </div>
                        <div className="mobile-content">
                            <div className="content-info">
                                <div className="ft-logo mb-6">
                                    <Link href="./" className="custom-logo-link lg:m-0 m-auto">
                                        <Image src="images/logo.png" alt="logo" width={133} height={38} />
                                    </Link>
                                </div>
                                <div className="ft-info-list flex flex-col items-start gap-y-10">
                                    <div className="content-info">
                                        <p className="tt flex items-center gap-4 font-semibold text-3xl mb-4 cl-blue">
                                            Socials
                                        </p>
                                        <Socials classCustom="mt-6"></Socials>
                                    </div>
                                    <div className="content-info">
                                        <p className="tt flex items-center gap-4 font-semibold text-3xl mb-4 cl-blue">
                                            Contact
                                        </p>
                                        <ul className="menu-list flex flex-col item-start gap-4">
                                            <li className="menu-item font-semibold flex gap-4 items-center">
                                                <Image
                                                    src="images/phone-call.png"
                                                    alt="phone-call"
                                                    width={24}
                                                    height={24}
                                                />
                                                <Link className="menu-link text-2xl font-medium" href="./">
                                                    Phone numbers: 0773188858
                                                </Link>
                                            </li>
                                            <li className="menu-item font-semibold flex gap-4 items-center">
                                                <Image src="images/gmail.png" alt="mail" width={24} height={24} />
                                                <Link className="menu-link text-2xl font-medium" href="./">
                                                    Email: hpthien1307@gmail.com
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
