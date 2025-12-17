import React, { useState } from "react";
import { mdiAccountPlus, mdiAccount, mdiLock, mdiEmail } from "@mdi/js";
import Icon from "@mdi/react";

function RegisterPage() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-3">
          <h1 className="text-4xl font-extrabold">Tokoku</h1>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Daftarkan akunmu!
        </h2>

        <form>
          {/* Input Nama Lengkap */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Nama Lengkap
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-emerald-200">
              <Icon
                path={mdiAccount}
                size={0.8}
                className="text-gray-400 ml-3"
              />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nama Lengkap Anda"
                className="grow p-3 outline-none bg-transparent rounded-r-md"
                required
              />
            </div>
          </div>

          {/* Input Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-emerald-200">
              <Icon path={mdiEmail} size={0.8} className="text-gray-400 ml-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                className="grow p-3 outline-none bg-transparent rounded-r-md"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-emerald-200">
              <Icon path={mdiLock} size={0.8} className="text-gray-400 ml-3" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Buat Password"
                className="grow p-3 outline-none bg-transparent rounded-r-md"
                required
              />
            </div>
          </div>

          {/* Input Konfirmasi Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Konfirmasi Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-emerald-200">
              <Icon path={mdiLock} size={0.8} className="text-gray-400 ml-3" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Ulangi Password"
                className="grow p-3 outline-none bg-transparent rounded-r-md"
                required
              />
            </div>
          </div>

          {/* Persetujuan Syarat dan Ketentuan */}
          <div className="flex items-center mb-6 text-sm">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-700 border-gray-300 rounded"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="ml-2 block text-gray-900">
              Saya setuju dengan{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Syarat dan Ketentuan
              </a>
            </label>
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            // 4. Tambahkan atribut disabled dan styling-nya
            disabled={!isChecked}
            className={`w-full p-3 rounded-md transition duration-150 ease-in-out text-white
              ${
                isChecked
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                  : "bg-gray-400 cursor-not-allowed opacity-70"
              }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <Icon path={mdiAccountPlus} size={0.8} />
              <span>Daftar Sekarang</span>
            </span>
          </button>
        </form>

        {/* Opsi Login */}
        <p className="mt-8 text-center text-gray-600 text-sm">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Login di Sini
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
