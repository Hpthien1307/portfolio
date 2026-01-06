'use client';

import Image from 'next/image';
import Link from 'next/link';
import Socials from './components/socials/socials';
import MenuNav from './nav/MenuNav';
import Heading from './components/heading/heading';

export default function Footer() {
    return (
        <footer className="ft relative" id="contact">
            <div className="bg-ab">
                <Image src="images/bg-ft.jpg" alt="bg_ft" width={1728} height={835} />
            </div>
            <div className="container">
                <div className="ft-wrap py-20 lg:py-60 lg:h-screen flex flex-col gap-y-4">
                    <Heading title="Liên hệ" classTitle="title-pri" />
                    <div className="ft-flex flex flex-col items-center justify-center gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-16 flex-wrap">
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
                                            <Link
                                                className="menu-link text-2xl font-medium"
                                                href="https://zalo.me/0773188858"
                                                target="_blank"
                                            >
                                                Phone numbers: 0773188858
                                            </Link>
                                        </li>
                                        <li className="menu-item font-semibold flex gap-4 items-center">
                                            <Image src="images/gmail.png" alt="mail" width={24} height={24} />
                                            <Link
                                                className="menu-link text-2xl font-medium"
                                                href="mailto:hpthien1307@gmail.com"
                                                target="_blank"
                                            >
                                                Email: hpthien1307@gmail.com
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="ft-menu">
                            <MenuNav />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
