"use client";

import { useState } from "react";
import CountryCard from "@/components/CountryCard";

const PAGE_SIZE = 20;

export default function CountryPagination({ countries }) {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(countries.length / PAGE_SIZE);
    const startIndex = (page - 1) * PAGE_SIZE;
    const currentCountries = countries.slice(startIndex, startIndex + PAGE_SIZE);

    function goToPage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentCountries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                    style={{ backgroundColor: "var(--primary)", color: "#fff" }}
                >
                    ← Previous
                </button>

                <span className="text-sm" style={{ color: "var(--text)" }}>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                    style={{ backgroundColor: "var(--primary)", color: "#fff" }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
