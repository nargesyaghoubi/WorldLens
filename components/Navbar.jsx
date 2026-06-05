'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
    {href: "/", label: "Home"},
    {href: "/countries", label: "Countries"},
    {href: "/search", label: "Search"},
    {href: "/about", label: "About"},
];


export default function Navbar() {
    const pathName = usePathname();
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    🌍 World Explorer
                </Link>

                <nav className="flex gap-6">
                    {links.map((link) => {
                        const isActive = pathName === link.href;
                        return (
                            <Link key={link.href} href={link.href}
                                className={isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}