'use client';

import { useState } from "react";

export default function CountrySearch({ countries }) {
    const [query, setQuery] = useState("");

    // Filter countries based on search input
    const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div>
                {filtered.map((country) => (
                    <div key={country.cca3}>
                        <p>{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}