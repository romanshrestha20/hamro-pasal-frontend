"use client";

import Link from "next/link";

interface NavbarLinkProps {
    href: string;
    label: string;
    className?: string;
    }

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, label, className }) => {
    return (
        <Link href={href} className={`text-gray-100 hover:text-gray-900 ${className}`}>
            {label}
        </Link>
    );
};

export default NavbarLink;
