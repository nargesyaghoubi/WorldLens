// This page can be statically rendered and cached.

import CountryPagination from "@/components/CountryPagination";
import { getAllCountries } from "@/lib/countries";

export const metadata = {
  title: "Explore Countries | WorldLens",
};

export default async function CountriesPage() {
  const countries = await getAllCountries({ cache: "force-cache" });

  const sorted = [...countries].sort((a, b) =>
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

      <CountryPagination countries={sorted} />
    </main>
  );
}