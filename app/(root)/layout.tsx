import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import PageAnimatePresence from "@/components/page-transition/PageAnimatePresence";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="root">
            <Sidebar />
            <MobileNav />

            <Suspense>
                <PageAnimatePresence>
                    <div className="root-container">
                        <div className="wrapper">
                            {children}
                        </div>
                    </div>
                </PageAnimatePresence>
            </Suspense>
        </main>
    )
}
