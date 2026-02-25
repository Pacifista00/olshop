import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";

const AddressForm = ({ addressId = null }) => {
  const navigate = useNavigate();
  const isEdit = Boolean(addressId);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
    is_default: false,
  });

  /* ================= FETCH DETAIL ================= */
  useEffect(() => {
    if (!isEdit) return;

    const fetchAddress = async () => {
      try {
        const res = await api.get(`/addresses/${addressId}`);
        const data = res.data.data;

        setForm({
          recipient_name: data.recipient_name,
          phone: data.phone,
          street_address: data.street_address,
          city: data.city,
          province: data.province,
          postal_code: data.postal_code,
          is_default: Boolean(data.is_default),
        });
      } catch (err) {
        setAlert({
          type: "error",
          text: err.response?.data?.message || "Gagal mengambil data alamat",
        });
      }
    };

    fetchAddress();
  }, [addressId, isEdit]);

  /* ================= HANDLE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setAlert(null);

    try {
      if (isEdit) {
        await api.put(`/addresses/update/${addressId}`, form);
      } else {
        await api.post("/addresses/store", form);
      }

      navigate("/profile/address");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        setAlert({
          type: "error",
          text: err.response.data.message,
        });
      } else {
        setAlert({
          type: "error",
          text: "Terjadi kesalahan server",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      {alert && (
        <div className="mb-4 bg-red-100 text-red-700 border border-red-200 px-4 py-3 rounded">
          {alert.text}
        </div>
      )}

      <h2 className="text-xl font-bold mb-6">
        {isEdit ? "Edit Alamat" : "Tambah Alamat"}
      </h2>

      <Input
        label="Nama Penerima"
        name="recipient_name"
        value={form.recipient_name}
        onChange={handleChange}
        error={errors.recipient_name}
      />
      <Input
        label="Nomor Telepon"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Textarea
        label="Alamat Lengkap"
        name="street_address"
        value={form.street_address}
        onChange={handleChange}
        error={errors.street_address}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Kota"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
        />
        <Input
          label="Provinsi"
          name="province"
          value={form.province}
          onChange={handleChange}
          error={errors.province}
        />
      </div>

      <Input
        label="Kode Pos"
        name="postal_code"
        value={form.postal_code}
        onChange={handleChange}
        error={errors.postal_code}
      />

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          name="is_default"
          checked={form.is_default}
          onChange={handleChange}
        />
        Jadikan sebagai alamat utama
      </label>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 my-btn-primary rounded"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      {...props}
      className={`w-full border px-3 py-2 rounded ${error && "border-red-500"}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <textarea
      {...props}
      rows={3}
      className={`w-full border px-3 py-2 rounded ${error && "border-red-500"}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default AddressForm;
