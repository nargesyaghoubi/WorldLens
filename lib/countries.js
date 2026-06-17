const API_BASE = "https://api.restcountries.com/countries/v5";

const RESPONSE_FIELDS = [
    "names.common",
    "names.official",
    "codes.alpha_3",
    "flag.url_png",
    "flag.url_svg",
    "capitals",
    "region",
    "subregion",
    "population",
    "languages",
    "currencies",
    "timezones",
    "links.google_maps",
].join(",");

function authHeaders() {
    const apiKey = process.env.RESTCOUNTRIES_API_KEY;
    if (!apiKey) {
        throw new Error(
            "Missing RESTCOUNTRIES_API_KEY environment variable. Add it to .env.local (and to your Vercel project settings)."
        );
    }
    return {
        Authorization: `Bearer ${apiKey}`,
    };
}

// CountryCard, CountrySearch, and the country details page.

function normalizeCountry(raw) {
    const common = raw?.names?.common;
    const official = raw?.names?.official;
    const alpha3 = raw?.codes?.alpha_3;
    const flagPng = raw?.flag?.url_png;
    const flagSvg = raw?.flag?.url_svg;
    const capitals = raw?.capitals;
    const region = raw?.region;
    const subregion = raw?.subregion;
    const population = raw?.population;
    const languagesRaw = raw?.languages;
    const currenciesRaw = raw?.currencies;
    const timezones = raw?.timezones;
    const googleMaps = raw?.links?.google_maps;

    const capitalNames = Array.isArray(capitals)
        ? capitals.map((c) => c.name).filter(Boolean)
        : [];

    let languages;
    if (Array.isArray(languagesRaw)) {
        languages = {};
        for (const lang of languagesRaw) {
            const code = lang.iso639_1 || lang.iso639_3 || lang.bcp47 || lang.name;
            const name = lang.name || code;
            if (code) languages[code] = name;
        }
    }

    // currencies: could already be an object map { CODE: { name, symbol } }
    // or an array of { code, name, symbol }. Normalize to object map.

    let currencies;
    if (currenciesRaw && !Array.isArray(currenciesRaw)) {
        currencies = currenciesRaw;
    } else if (Array.isArray(currenciesRaw)) {
        currencies = {};
        for (const cur of currenciesRaw) {
            if (cur.code) {
                currencies[cur.code] = { name: cur.name, symbol: cur.symbol };
            }
        }
    }

    return {
        cca3: alpha3 || "",
        name: {
            common: common || official || "Unknown",
            official: official || common || "Unknown",
        },
        flags: {
            png: flagPng || "",
            svg: flagSvg || "",
        },
        capital: capitalNames,
        region: region,
        subregion: subregion,
        population: population,
        languages: languages,
        currencies: currencies,
        timezones: timezones,
        maps: {
            googleMaps: googleMaps || "",
        },
    };
}

// Fetch a page of countries. Returns a normalized array.
// `limit` defaults to 100 (the max the API allows per page).
// Countries without a valid alpha-3 code (e.g. disputed territories
// like Abkhazia) are filtered out, since the details page is keyed
// by that code.

export async function getAllCountries({
    limit = 100,
    offset = 0,
    cache = "force-cache",
} = {}) {
    const url = `${API_BASE}?response_fields=${RESPONSE_FIELDS}&limit=${limit}&offset=${offset}`;

    const res = await fetch(url, {
        headers: authHeaders(),
        cache,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch countries: ${res.status}`);
    }

    const json = await res.json();
    const objects = json?.data?.objects || [];

    return objects
        .map(normalizeCountry)
        .filter((c) => c.cca3 && c.name.common !== "Unknown");
}

// Fetch a single country by its alpha-3 code (e.g. "AFG").
// Returns a normalized country object, or null if not found.
export async function getCountryByCode(code, { cache = "no-store" } = {}) {
    const url = `${API_BASE}?codes.alpha_3=${encodeURIComponent(
        code
    )}&response_fields=${RESPONSE_FIELDS}&limit=1`;

    const res = await fetch(url, {
        headers: authHeaders(),
        cache,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch country ${code}: ${res.status}`);
    }

    const json = await res.json();
    const objects = json?.data?.objects || [];
    if (objects.length === 0) return null;

    return normalizeCountry(objects[0]);
}