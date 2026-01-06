import type { Metadata } from 'next';
import './globals.css';
import '../scss/style.scss';
import Header from './header/header';
import Footer from './footer';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'Portfolio'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="">
                <Header />
                <main className="main">{children}</main>
                <div className="starfield max-2xl:hidden max-2xl:pointer-none:">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <Footer />
            </body>
        </html>
    );
}
