import type { Metadata } from 'next';
import './globals.css';
import '../scss/style.scss';
import Header from './header/header';
import Footer from './footer';
import SmoothScrollProvider from './components/smooth-scroll-provider';

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
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                                    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
                                    const originalInject = hook.inject;
                                    hook.inject = function(renderer) {
                                        if (renderer && (!renderer.version || typeof renderer.version !== 'string' || renderer.version.trim() === '')) {
                                            renderer.version = '19.0.0';
                                        }
                                        return originalInject.apply(this, arguments);
                                    };
                                }
                            })();
                        `
                    }}
                />
            </head>
            <body className="">
                <SmoothScrollProvider>
                    <Header />
                    <main className="main">{children}</main>
                    <div className="starfield max-2xl:hidden max-2xl:pointer-none:">
                        <div id="stars"></div>
                        <div id="stars2"></div>
                        <div id="stars3"></div>
                    </div>
                    <Footer />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
