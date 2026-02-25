import { Link } from "react-router-dom";

export default function Forbidden403() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold">403</h1>

        <p className="mt-4 text-xl font-semibold">Akses Ditolak</p>

        <p className="mt-2 text-sm">
          Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi
          administrator jika ini adalah kesalahan.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
