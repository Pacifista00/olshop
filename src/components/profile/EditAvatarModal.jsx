import { useState } from "react";
import { updateAvatar } from "../../services/ProfileService";
import { useAuth } from "../../auth/AuthContext";

const EditAvatarModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const userData = user?.user || user;
  const [alert, setAlert] = useState(null);
  // { type: "success" | "error", message: "..." }

  const [preview, setPreview] = useState(userData?.avatarUrl || null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("photo", file);

      const res = await updateAvatar(formData);

      setUser(res.data.user);

      setAlert({
        type: "success",
        message: "Foto profil berhasil diperbarui!",
      });
    } catch (err) {
      console.error("Gagal update avatar", err);

      setAlert({
        type: "error",
        message: "Gagal memperbarui foto profil",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center">
        {/* Header */}
        <h3 className="text-2xl font-bold mb-2">Ganti Foto Profil</h3>
        <p className="text-sm mb-6">Upload foto baru untuk profil Anda</p>

        {/* Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                preview
                  ? preview
                  : userData?.photo
                    ? `${baseUrl}/storage/${userData.photo}`
                    : defaultAvatar
              }
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-100 shadow-md"
            />
          </div>
        </div>

        {/* Upload Button */}
        <label className="block mb-4">
          <span className="cursor-pointer inline-block px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            Pilih Foto
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            name="photo"
          />
        </label>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={!file || saving}
            className="px-5 py-2 text-sm rounded-lg my-btn-primary transition disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
      {alert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center animate-fadeIn">
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

            <p className="text-sm mb-6">{alert.message}</p>

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

export default EditAvatarModal;
