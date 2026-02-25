import React, { useEffect, useState } from "react";
import api from "../../services/Api";

function VerifyOtpPage() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!email) {
      setMessage("Email tidak ditemukan");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;

    setLoading(true);
    setMessage(null);

    try {
      await api.post("/verify-otp", {
        email,
        otp,
      });

      alert("Verifikasi berhasil, silakan login");
      window.location.href = "/login";
    } catch (error) {
      setMessage(error.response?.data?.message || "OTP tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setMessage(null);

    try {
      await api.post("/resend-otp", { email });
      setMessage("OTP baru telah dikirim ke email");
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal mengirim OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verifikasi OTP</h2>

        <p className="text-sm  text-center mb-6">
          Masukkan kode OTP yang dikirim ke <br />
          <span className="font-semibold">{email}</span>
        </p>

        {message && (
          <div className="mb-4 text-sm text-center text-red-600">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="6 digit OTP"
            className="w-full text-center tracking-widest text-xl p-3 border rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Tidak menerima OTP?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-blue-600 hover:underline disabled:opacity-60"
          >
            {resending ? "Mengirim..." : "Kirim Ulang"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
