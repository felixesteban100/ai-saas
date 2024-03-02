'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "../mode-toogle"

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <header className="header">
            <Link href={"/"} className="flex items-center gap-2 md:py-2">
                <Image
                    className="invert"
                    src={"/assets/images/logo-text.svg"}
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>



            <nav className="flex gap-2 items-center">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Image
                                src={'/assets/icons/menu.svg'}
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer svg-color"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <div className="flex items-center justify-between">
                                    <Image
                                        src={"/assets/images/logo-text.svg"}
                                        alt="logo"
                                        width={152}
                                        height={23}
                                        className="invert"
                                    />
                                    <div className="flex justify-end items-center w-full">
                                        <ModeToggle />
                                    </div>
                                </div>
                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname

                                        return (
                                            <li key={link.route} className={`${isActive && "gradient-text"} p-18 flex whitespace-nowrap`}>
                                                <SheetClose asChild>
                                                    <Link href={link.route} className="sidebar-link cursor-pointer">
                                                        <Image
                                                            src={link.icon}
                                                            alt={link.label}
                                                            width={24}
                                                            height={24}
                                                            className={`svg-color`}
                                                        />
                                                        {link.label}
                                                    </Link>
                                                </SheetClose>
                                            </li>
                                        )
                                    })}
                                    <li className="flex-center cursor-pointer gap-2 p-4">
                                        <UserButton afterSignOutUrl="/" showName />
                                    </li>
                                </ul>

                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-primary bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>

                    <div className="flex justify-end items-center w-full">
                        <ModeToggle />
                    </div>
                </SignedOut>


            </nav>
        </header>
    )
}
