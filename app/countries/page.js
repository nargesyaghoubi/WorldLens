import CountryCard from "@/components/CountryCard";

export const dynamic = 'force-dynamic';

// This page fetches fresh data every time.
export default async function CountriesPage() {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags"
    );
    const countries = await res.json();

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