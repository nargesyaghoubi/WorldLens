// This page can be statically rendered and cached.

import CountryCard from "@/components/CountryCard";
import { getAllCountries } from "@/lib/countries";


export default async function CountriesPage() {
    const countries = await getAllCountries({
        limit: 100,
        cache: "force-cache",
    });

    const sorted = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <main className="py-10 px-4">
            <h1
                className="text-3xl font-bold text-center mb-8"
                style={{ color: "var(--primary)" }}
            >
                Explore Countries
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sorted.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </main>
    );
}