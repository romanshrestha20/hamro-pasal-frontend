import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl px-6 py-12 mx-auto">
      <header className="flex items-center justify-between mb-8"></header>

      <section className="p-8 border shadow-sm rounded-2xl bg-card border-border">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Welcome 👋
        </h2>

        <div className="text-muted-foreground">
          <p className="mb-4">
            Welcome to Hamro Pasal, your one-stop shop for all your shopping
            needs! Explore our wide range of products across various categories
            and find the best deals.
          </p>

          <p>
            Get started by browsing our{" "}
            <Link
              href="/products"
              className="text-accent hover:underline"
            >
              Products
            </Link>{" "}
            or managing your{" "}
            <Link
              href="/categories"
              className="text-accent hover:underline"
            >
              Categories
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
