export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-gray-100 border-t mt-auto py-6">
            <div className="container mx-auto px-4 flex justify-between items-center text-gray-500 text-sm">
                <span>© {year} Narges Yaghoubi</span>
                <span>Built with Next.js App Router</span>
            </div>
        </footer>
    )
}