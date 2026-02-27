import React, { useState } from "react";
import { mdiAccount, mdiLock, mdiEmail } from "@mdi/js";
import Icon from "@mdi/react";
import { useAuth } from "../../auth/AuthContext";

function RegisterPage() {
  const [isChecked, setIsChecked] = useState(false);

  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) return;

    try {
      await register(form);
      window.location.href = `/verify-otp?email=${form.email}`;
    } catch (error) {
      alert(error.response?.data?.message || "Register gagal, coba lagi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-3">
          <img
            src="/image/logo/logo.png"
            alt="Logo"
            className="h-12 cursor-pointer"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Daftarkan akunmu!
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Nama Lengkap */}
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap Anda"
            className="hidden"
            value={form.name}
            onChange={handleChange}
          />

          {/* Input Nama Lengkap */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nama Lengkap
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Icon
                path={mdiAccount}
                size={0.8}
                className="ml-3 text-gray-400"
              />
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap Anda"
                className="grow p-3 outline-none"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Icon path={mdiEmail} size={0.8} className="ml-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="grow p-3 outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Icon path={mdiLock} size={0.8} className="ml-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Buat Password"
                className="grow p-3 outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Konfirmasi Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Icon path={mdiLock} size={0.8} className="ml-3 text-gray-400" />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Ulangi Password"
                className="grow p-3 outline-none"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center mb-6 text-sm">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className="ml-2">
              Saya setuju dengan Syarat dan Ketentuan
            </span>
          </div>

          <button
            type="submit"
            disabled={!isChecked || loading}
            className={`w-full p-3 rounded-md text-white ${
              isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            }`}
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
