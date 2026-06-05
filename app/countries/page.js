import CountryCard from "@/components/CountryCard";

// This page can be statically rendered and cached.

export default async function CountriesPage() {
    const res = await fetch("https://restcountries.com/v3.1/all", {
        cache: "force-cache",
    });

    const countries = await res.json();

    return (
        <main>
            <h1>Explore Countries</h1>
            {/* Rendering first 20 countries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {countries.slice(0, 20).map((country) => (
                    // Each country gets a unique key using its 3-letter code
                    <CountryCard key={country.cca3} country={country}/>
                ))}
            </div>
        </main>
    );
}