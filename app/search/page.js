import CountrySearch from "@/components/CountrySearch";
import { getAllCountries } from "@/lib/countries";

export const metadata = {
    title: "Search Countries | World Explorer",
};

export default async function SearchPage() {
    const countries = await getAllCountries({
        limit: 100,
        cache: "force-cache",
    });

    const sorted = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <main className="py-10 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: "var(--primary)" }}
                >
                    Search Countries
                </h1>
                <p style={{ color: "var(--text)", opacity: 0.6 }}>
                    Search by name or filter by region
                </p>
            </div>

            {/* CountrySearch is a client component that handles filtering */}
            <CountrySearch countries={sorted} />
        </main>
    );
}