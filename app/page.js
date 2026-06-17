import Link from "next/link";
import { MapPin, Flag, Languages, Search, BookOpen, Users, DollarSign, Map, MessageSquare, BarChart3 } from "lucide-react";
import { getAllCountries } from "@/lib/countries";

export default async function HomePage() {
    const countries = await getAllCountries({ limit: 100, cache: "force-cache" });

    const totalCountries = countries.length;
    const regions = new Set(countries.map((c) => c.region).filter(Boolean));
    const totalRegions = regions.size;
    const totalPopulation = countries.reduce(
        (sum, c) => sum + (c.population || 0),
        0
    );

    const stats = [
        { value: `${totalCountries}+`, label: "Countries" },
        { value: `${totalRegions}`, label: "Regions" },
        { value: `${(totalPopulation / 1_000_000_000).toFixed(1)}B+`, label: "People" },
    ];

    const features = [
        {
            icon: Flag,
            title: "Flags & Names",
            description:
                "View the official flag and both common and official names of every country.",
        },
        {
            icon: BarChart3,
            title: "Capitals & Regions",
            description:
                "Find out the capital city and which region and subregion the country belongs to.",
        },
        {
            icon: Users,
            title: "Population Data",
            description: "See up-to-date population numbers for every country in the world.",
        },
        {
            icon: MessageSquare,
            title: "Languages",
            description: "Discover the official languages spoken in each country.",
        },
        {
            icon: DollarSign,
            title: "Currencies",
            description: "Learn about the currency used, including its name and symbol.",
        },
        {
            icon: Map,
            title: "Google Maps",
            description: "Open any country directly in Google Maps with a single click.",
        },
    ];

    return (
        <div>
            {/* HERO */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4 gap-6">
                <div className="text-6xl mb-6 animate-bounce">🌍</div>

                <span
                    className="text-xs font-bold tracking-wider px-4 py-1.5 rounded-full"
                    style={{
                        color: "var(--primary)",
                        backgroundColor: "var(--card-bg)",
                        border: "1px solid var(--primary)",
                    }}
                >
                    {totalCountries}+ COUNTRIES &amp; TERRITORIES
                </span>

                <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl"
                    style={{ color: "var(--text)" }}
                >
                    Discover Every{" "}
                    <span style={{ color: "var(--primary)" }}>Country</span> on Earth
                </h1>

                <p className="text-lg max-w-xl" style={{ color: "var(--text)", opacity: 0.7 }}>
                    Explore countries around the world and learn about their flags,
                    capitals, populations, currencies, and languages.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    <Link
                        href="/countries"
                        className="flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        <BookOpen size={18} />
                        Explore Countries
                    </Link>

                    <Link
                        href="/search"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg hover:opacity-80 transition font-semibold"
                        style={{
                            backgroundColor: "var(--card-bg)",
                            color: "var(--text)",
                            border: "1px solid var(--primary)",
                        }}
                    >
                        <Search size={18} />
                        Search a Country
                    </Link>
                </div>

                {/* STATS */}
                <div
                    className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mt-12 pt-10 w-full max-w-2xl"
                    style={{ borderTop: "1px solid var(--primary)", borderOpacity: 0.2 }}
                >
                    {stats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                            <span className="text-3xl font-bold" style={{ color: "var(--text)" }}>
                                {value}
                            </span>
                            <span
                                className="text-xs tracking-wider font-semibold"
                                style={{ color: "var(--text)", opacity: 0.5 }}
                            >
                                {label.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </section>


            <section className="py-16 px-4">
                <h2
                    className="text-3xl font-bold text-center mb-10"
                    style={{ color: "var(--text)" }}
                >
                    What You Can Explore
                </h2>

                {/* Features section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="rounded-xl p-6 shadow-md hover:-translate-y-1 transition-transform duration-300"
                            style={{ backgroundColor: "var(--card-bg)" }}
                        >
                            <Icon size={24} style={{ color: "var(--primary)" }} className="mb-3" />
                            <h3 className="font-bold mb-2" style={{ color: "var(--text)" }}>
                                {title}
                            </h3>
                            <p className="text-sm" style={{ color: "var(--text)", opacity: 0.6 }}>
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}