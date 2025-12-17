import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Saat cek auth (misal refresh)
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // Jika belum login → redirect ke login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Jika sudah login → tampilkan halaman
  return children;
}
