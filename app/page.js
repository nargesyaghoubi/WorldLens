import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 gap-6">
      
      <h1 className="text-5xl font-bold text-blue-600">
        🌍 World Explorer
      </h1>
      
      <p className="text-gray-600 text-lg max-w-xl">
        Explore countries around the world and learn about their flags, 
        capitals, populations, currencies, and languages.
      </p>

      <Link href="/countries" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Explore Countries
      </Link>

    </section>
  );
}