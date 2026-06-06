'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
    { href: "/", label: "Home" },
    { href: "/countries", label: "Countries" },
    { href: "/search", label: "Search" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const pathName = usePathname();
    return (
        <header className="shadow-md py-4" style={{ backgroundColor: "var(--bg)" }}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold" style={{ color: "var(--primary)" }}>
                    🌍 World Explorer
                </Link>

                <nav className="flex gap-6 items-center">
                    {links.map((link) => {
                        const isActive = pathName === link.href;
                        return (
                            <Link key={link.href} href={link.href}
                                style={{ color: isActive ? "var(--primary)" : "var(--text)" }}
                                className={isActive ? "font-semibold" : "hover:opacity-70"}>
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}