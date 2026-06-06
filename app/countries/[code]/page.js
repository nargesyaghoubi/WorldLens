import Link from "next/link";
export default async function CountryDetailsPage({ params }) {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${params.code}`,
      {
        cache: "no-store",
      }
    );
  
    const data = await res.json();
    const country = data[0];
  
    return (
      <main>
        <img src={country.flags.png} alt={country.name.common} />
        <h1>{country.name.common}</h1>
        <p>Official Name: {country.name.official}</p>
        <p>Capital: {country.capital?.[0]}</p>
        <p>Region: {country.region}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <Link href={country.maps.googleMaps} target="_blank">
          View on Google Maps
        </Link>
      </main>
    );
  }
  