import Link from 'next/link';

type BtnProps = {
    href?: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
};

export default function Btn({ href, className = '', children, ...props }: BtnProps) {
    if (href) {
        return (
            <Link href={href} className={`btn ${className}`} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={`btn ${className}`} {...props}>
            {children}
        </button>
    );
}
