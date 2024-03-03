import PageAnimatePresence from "@/components/page-transition/PageAnimatePresence";
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="root">
            <Sidebar />
            <MobileNav />

            <PageAnimatePresence>
                <div className="root-container">
                    <div className="wrapper">
                        {children}
                    </div>
                </div>
            </PageAnimatePresence>
        </main>
    )
}
