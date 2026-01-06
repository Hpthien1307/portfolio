'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from './menu';

export default function MenuNav() {
    const pathname = usePathname();
    return (
        <ul className="menu-list">
            {Menu.map(item => (
                <li key={item.href} className={`menu-item${pathname === item.href ? ' current-menu-item' : ''}`}>
                    <Link href={item.href} className="menu-link uppercase font-semibold text-2xl">
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
