import React, { useState } from "react";
import { mdiAccount, mdiLock, mdiLogin } from "@mdi/js";
import Icon from "@mdi/react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Jika sudah login → redirect
  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-3">
          <h1 className="text-4xl font-extrabold">Tokoku</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Selamat Datang Kembali!
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
              <Icon
                path={mdiAccount}
                size={0.8}
                className="text-gray-400 ml-3"
              />
              <input
                type="email"
                placeholder="email@example.com"
                className="grow p-3 outline-none bg-transparent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
              <Icon path={mdiLock} size={0.8} className="text-gray-400 ml-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="grow p-3 outline-none bg-transparent"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer text-white p-3 rounded-md transition
              ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            <span className="flex items-center justify-center space-x-2">
              <Icon path={mdiLogin} size={0.8} />
              <span>{loading ? "Loading..." : "Login"}</span>
            </span>
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Daftar Sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
