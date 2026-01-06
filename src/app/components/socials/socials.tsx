import Link from 'next/link';
import Image from 'next/image';

type socials = {
    classCustom?: string;
};

export default function Socials({ classCustom }: socials) {
    const icons = [
        {
            path: 'facebook.png',
            alt: 'facebook',
            href: './'
        },
        {
            path: 'instagram.png',
            alt: 'instagram',
            href: './'
        },
        {
            path: 'tik-tok.png',
            alt: 'tik-tok',
            href: './'
        },
        {
            path: 'zalo.png',
            alt: 'zalo',
            href: './'
        },
        {
            path: 'telegram.png',
            alt: 'telegram',
            href: './'
        }
    ];
    return (
        <div className={`socials-block ${classCustom}`}>
            <div className="social-list flex items-center gap-6">
                {icons &&
                    icons.map((item, i) => (
                        <Link key={i} href={item.href} className="social-link">
                            <Image src={`images/${item.path}`} alt={item.alt} width={40} height={40} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
