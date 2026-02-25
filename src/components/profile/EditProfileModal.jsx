import { useState, useEffect } from "react";
import { updateProfile } from "../../services/ProfileService";
import { useAuth } from "../../auth/AuthContext";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const userData = user?.user || user;
  const [alert, setAlert] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Reset form setiap modal dibuka
  useEffect(() => {
    if (isOpen && userData) {
      setForm({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
      });
      setErrors({});
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setErrors({});
      setAlert(null);

      const res = await updateProfile(form);

      setUser(res.data.user);

      setAlert({
        type: "success",
        message: "Profil berhasil diperbarui!",
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setAlert({
          type: "error",
          message: "Terjadi kesalahan saat memperbarui profil",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Edit Profil</h3>
          <p className="text-sm ">Perbarui informasi akun Anda</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium  mb-1">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium  mb-1">
              No. Telepon
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
            )}
          </div>

          {/* GENDER SEGMENT BUTTON */}
          <div>
            <label className="block text-sm font-medium  mb-2">Gender</label>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setForm({ ...form, gender: "male" })}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                  form.gender === "male" ? "bg-white shadow text-blue-600" : ""
                }`}
              >
                Male
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, gender: "female" })}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                  form.gender === "female"
                    ? "bg-white shadow text-pink-600"
                    : ""
                }`}
              >
                Female
              </button>
            </div>

            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender[0]}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 text-sm rounded-lg my-btn-primary transition disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
      {alert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <div
              className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
                alert.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {alert.type === "success" ? "✓" : "✕"}
            </div>

            <h4 className="text-lg font-semibold mb-2">
              {alert.type === "success" ? "Berhasil" : "Terjadi Kesalahan"}
            </h4>

            <p className="text-sm  mb-6">{alert.message}</p>

            <button
              onClick={() => {
                if (alert.type === "success") {
                  onClose();
                }
                setAlert(null);
              }}
              className={`px-6 py-2 rounded-lg text-white transition ${
                alert.type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
