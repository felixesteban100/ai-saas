'use client'

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toogle";

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href={"/"} className="sidebar-logo">
                    <Image className="invert" src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
                </Link>

                <nav className="sidebar-nav">
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                    <NavbarLinkELement
                                        key={link.label}
                                        isActive={isActive}
                                        route={link.route}
                                        label={link.label}
                                        icon={link.icon}
                                    />
                                )
                            })}
                        </ul>

                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                    <NavbarLinkELement
                                        key={link.label}
                                        isActive={isActive}
                                        route={link.route}
                                        label={link.label}
                                        icon={link.icon}
                                    />
                                )
                            })}
                            <li className="flex-center cursor-pointer gap-2 p-4">
                                <UserButton afterSignOutUrl="/" showName />
                            </li>
                        </ul>
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className="button bg-primary bg-cover">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>

                    <div className="flex justify-end items-center w-full">
                        <ModeToggle />
                    </div>
                </nav>
            </div>
        </aside>
    )
}

type NavbarLinkELementProps = {
    isActive: boolean;
    route: string;
    icon: string;
    label: string;
}

function NavbarLinkELement({ isActive, route, icon, label }: NavbarLinkELementProps) {
    return (
        <li key={route} className={`sidebar-nav_element group ${isActive ? "bg-primary text-primary-foreground" : ""}`}>
            <Link href={route} className="sidebar-link">
                <Image
                    src={icon}
                    alt={label}
                    width={24}
                    height={24}
                    // className={`${isActive && 'svg-color'} brightness-0 dark:brightness-200`}
                    className={`svg-color`}
                />
                {label}
            </Link>
        </li>
    )
}