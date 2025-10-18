import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Hamro Pasal</h1>
      <p className="mb-6">Your one-stop e-commerce store built with Next.js & Prisma</p>
      <div className="space-x-4">
        <Link href="/auth/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </Link>
        <Link href="/auth/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
}
