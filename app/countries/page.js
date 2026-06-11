import CountryCard from "@/components/CountryCard";

// Force dynamic rendering - don't prerender at build time
export const dynamic = 'force-dynamic';

// This page can be statically rendered and cached.
export default async function CountriesPage() {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags",
        { cache: "force-cache" }
    );

    const countries = await res.json();

    // Make sure data is an array before rendering
    if (!Array.isArray(countries)) {
        return (
            <main className="py-10 px-4 text-center">
                <p style={{color: "var(--text)"}}>Failed to load countries. Please try again.</p>
            </main>
        );
    }

    return (
        <main className="py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8" 
                style={{color: "var(--primary)"}}>
                Explore Countries
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.slice(0, 20).map((country) => (
                    <CountryCard key={country.cca3} country={country}/>
                ))}
            </div>
        </main>
    );
}