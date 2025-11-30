import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl px-6 py-16 mx-auto">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-foreground">
          Hamro Pasal 🛍️
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your one-stop shop for everything.
        </p>
      </header>

      {/* Welcome Card */}
      <section
        className="p-8 border shadow-sm  rounded-xl bg-card border-border"
      >
        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          Welcome 👋
        </h2>

        <div className="leading-relaxed text-muted-foreground">
          <p className="mb-4">
            Welcome to Hamro Pasal! Explore our wide range of products across
            various categories and discover amazing deals every day.
          </p>

          <p>
            Get started by browsing our{" "}
            <Link
              href="/products"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Products
            </Link>{" "}
            or managing your{" "}
            <Link
              href="/categories"
              className="font-medium text-primary underline-offset-4 hover:underline"
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
