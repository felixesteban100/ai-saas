import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import PageAnimatePresence from "@/components/page-transition/PageAnimatePresence";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="root">
            <Sidebar />
            <MobileNav />
            <div className="root-container">
                <div className="wrapper">
                    <Suspense>
                        <PageAnimatePresence>
                            <>
                                {children}
                            </>
                        </PageAnimatePresence>
                    </Suspense>
                </div>
            </div>

            <Toaster />
        </main>
    )
}
