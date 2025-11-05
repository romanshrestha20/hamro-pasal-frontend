import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8 flex items-center justify-between"></header>

      <section className="rounded-2xl border p-8">
        <h2 className="mb-2 text-xl font-semibold">Welcome 👋</h2>
        <div className="text-gray-500">
          <p className="mb-4">
            Welcome to Hamro Pasal, your one-stop shop for all your shopping
            needs! Explore our wide range of products across various categories
            and find the best deals.
          </p>
          <p>
            Get started by browsing our{" "}
            <Link href="/products" className="text-blue-600 hover:underline">
              Products
            </Link>{" "}
            or managing your{" "}
            <Link href="/categories" className="text-blue-600 hover:underline">
              Categories
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
