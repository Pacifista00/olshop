import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Saat cek auth (misal refresh halaman)
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // Belum login → redirect ke login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role yang diizinkan
  const allowedRoles = ["admin", "developer"];

  // Jika login tapi bukan admin / developer
  console.log(user.role);
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // Jika role sesuai → tampilkan halaman
  return children;
}
