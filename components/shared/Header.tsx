
type HeaderProps = {
    title: string;
    subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <>
            <h2
                className="h2-bold text-primary/80"
            >
                {title}
            </h2>
            <p className="p-16-regular mt-4">{subtitle}</p>
        </>
    )
}
