import CountrySearch from "@/components/CountrySearch";

export default async function SearchPage() {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,population,flags",
        { cache: "force-cache" }
    );

    const countries = await res.json();

    return (
        <main>
            <h1>Search Countries</h1>
            {/* CountrySearch is a client component that handles filtering */}
            <CountrySearch countries={countries} />
        </main>
    );
}