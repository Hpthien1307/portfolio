import Link from 'next/link';
import MagneticWrapper from '../magnetic-wrapper';

type BtnProps = {
    href?: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
};

export default function Btn({ href, className = '', children, ...props }: BtnProps) {
    if (href) {
        return (
            <MagneticWrapper>
                <Link href={href} className={`btn ${className}`} {...props}>
                    {children}
                </Link>
            </MagneticWrapper>
        );
    }

    return (
        <MagneticWrapper>
            <button className={`btn ${className}`} {...props}>
                {children}
            </button>
        </MagneticWrapper>
    );
}
