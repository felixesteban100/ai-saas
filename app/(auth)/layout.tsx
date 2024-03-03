export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth flex flex-col justify-center items-center">
            {/* <div className="w-[24rem] flex-end pb-5">
                <ModeToggle />
            </div> */}
            {children}
        </div>
    )
}