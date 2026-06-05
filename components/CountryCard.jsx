import Link from "next/link";

export default function CountryCard({ country }) {
    return (
        <div>
            <img src={country.flags.png} alt={country.name.common} />
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital?.[0] || "No capital"}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <Link href={`/countries/${country.cca3}`}>View Details</Link>
        </div>
    )
}