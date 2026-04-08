import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">MyApp</h1>
        <p className="text-lg text-gray-500 mb-8">
          A production-ready Next.js + Express + MongoDB boilerplate.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-9 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
