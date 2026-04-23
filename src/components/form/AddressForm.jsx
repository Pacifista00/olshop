import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";

const AddressForm = ({ addressId = null }) => {
  const navigate = useNavigate();
  const isEdit = Boolean(addressId);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingRegion, setLoadingRegion] = useState(false);

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    street_address: "",
    province: "",
    city: "",
    postal_code: "",
    is_default: false,
  });

  /* ================= LOAD PROVINCES ================= */
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingRegion(true);
        const res = await api.get("/regions/provinces");
        setProvinces(res.data.data || []);
      } catch (err) {
        console.error("Failed load provinces", err);
      } finally {
        setLoadingRegion(false);
      }
    };

    fetchProvinces();
  }, []);

  /* ================= LOAD CITIES WHEN PROVINCE CHANGE ================= */
  useEffect(() => {
    if (!form.province) return;

    const fetchCities = async () => {
      try {
        setLoadingRegion(true);
        const res = await api.get(`/regions/cities/${form.province}`);
        setCities(res.data.data || []);
      } catch (err) {
        console.error("Failed load cities", err);
      } finally {
        setLoadingRegion(false);
      }
    };

    fetchCities();
  }, [form.province]);

  /* ================= FETCH DETAIL (EDIT) ================= */
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
          province: data.province_code || "",
          city: data.city_code || "",
          postal_code: data.postal_code,
          is_default: Boolean(data.is_default),
        });
      } catch (err) {
        setAlert({
          type: "error",
          text: "Gagal mengambil data alamat",
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
      ...(name === "province" ? { city: "" } : {}), // reset city kalau province berubah
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setAlert(null);

    try {
      const selectedProvince = provinces.find((p) => p.code === form.province);

      const selectedCity = cities.find((c) => c.code === form.city);

      const payload = {
        ...form,
        province: selectedProvince?.name || "",
        city: selectedCity?.name ? cleanCityName(selectedCity.name) : "",
      };

      if (isEdit) {
        await api.put(`/addresses/update/${addressId}`, payload);
      } else {
        await api.post("/addresses/store", payload);
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
  const cleanCityName = (name) => {
    return name
      .replace(/^Kabupaten\s+/i, "")
      .replace(/^Kota\s+/i, "")
      .trim();
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      {alert && (
        <div className="mb-4 bg-red-100 text-red-700 border px-4 py-3 rounded">
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

      {/* ================= PROVINCE & CITY ================= */}
      <div className="grid grid-cols-2 gap-4">
        {/* PROVINCE */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Provinsi</label>
          <select
            name="province"
            value={form.province}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* CITY */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Kota / Kabupaten</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={!form.province || loadingRegion}
          >
            <option value="">Pilih Kota</option>
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
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

/* ================= COMPONENT INPUT ================= */
const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      {...props}
      className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}
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
      className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default AddressForm;
