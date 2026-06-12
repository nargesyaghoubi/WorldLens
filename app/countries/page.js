// This page can be statically rendered and cached.

import CountryCard from "@/components/CountryCard";

export default async function CountriesPage() {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags",
        { cache: "force-cache" }
    );

    const data = await res.json();
    const countries = Array.isArray(data) ? data : [];

    const sorted = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <main className="py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8"
                style={{ color: "var(--primary)" }}>
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
