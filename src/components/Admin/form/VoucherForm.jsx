import ComponentCard from "../common/ComponentCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Label from "./Label";
import Input from "./input/InputField";
import Select from "./Select";
import api from "../../../services/Api";

const VoucherForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "percentage",
    value: "",
    max_discount: "",
    min_order_amount: "",
    usage_limit: "",
    starts_at: "",
    expires_at: "",
    is_active: 1,
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  /* ======================
     INPUT CHANGE
  ====================== */
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const typeOptions = [
    { value: "percentage", label: "Persentase (%)" },
    { value: "fixed", label: "Nominal (Rp)" },
  ];

  /* ======================
     FETCH DATA (EDIT)
  ====================== */
  const fetchVoucher = async () => {
    try {
      setLoadingData(true);
      const res = await api.get(`/voucher/${id}`);
      const data = res.data.data;

      setForm({
        code: data.code,
        name: data.name,
        type: data.type,
        value: data.value,
        max_discount: data.max_discount ?? "",
        min_order_amount: data.min_order_amount ?? "",
        usage_limit: data.usage_limit ?? "",
        starts_at: data.starts_at?.slice(0, 16) ?? "",
        expires_at: data.expires_at?.slice(0, 16) ?? "",
        is_active: data.is_active,
      });
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data voucher");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchVoucher();
  }, [id]);

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      setLoadingSubmit(true);

      if (isEdit) {
        formData.append("_method", "PUT");
        await api.post(`/voucher/update/${id}`, formData);
        alert("Voucher berhasil diperbarui");
      } else {
        await api.post("/voucher/store", formData);
        alert("Voucher berhasil ditambahkan");
      }

      navigate("/dashboard/voucher");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan voucher");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingData) {
    return <p className="text-center">Memuat data voucher...</p>;
  }

  return (
    <ComponentCard title={isEdit ? "Edit Voucher" : "Tambah Voucher"}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* CODE */}
        <div>
          <Label>Kode Voucher</Label>
          <Input
            name="code"
            value={form.code}
            onChange={onChange}
            placeholder="DISKON25"
            required
          />
        </div>

        {/* NAME */}
        <div>
          <Label>Nama Voucher</Label>
          <Input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Promo Tahun Baru"
            required
          />
        </div>

        {/* TYPE */}
        <div>
          <Label>Tipe Voucher</Label>
          <Select
            options={typeOptions}
            value={form.type}
            onChange={(value) => setForm({ ...form, type: value })}
          />
        </div>

        {/* VALUE */}
        <div>
          <Label>Nilai {form.type === "percentage" ? "(%)" : "(Rp)"}</Label>
          <Input
            type="number"
            name="value"
            value={form.value}
            onChange={onChange}
            required
          />
        </div>

        {/* MAX DISCOUNT */}
        {form.type === "percentage" && (
          <div>
            <Label>Maksimal Diskon (Rp)</Label>
            <Input
              type="number"
              name="max_discount"
              value={form.max_discount}
              onChange={onChange}
            />
          </div>
        )}

        {/* MIN ORDER */}
        <div>
          <Label>Minimal Order (Rp)</Label>
          <Input
            type="number"
            name="min_order_amount"
            value={form.min_order_amount}
            onChange={onChange}
          />
        </div>

        {/* USAGE LIMIT */}
        <div>
          <Label>Batas Penggunaan</Label>
          <Input
            type="number"
            name="usage_limit"
            value={form.usage_limit}
            onChange={onChange}
            placeholder="Kosongkan jika unlimited"
          />
        </div>

        {/* DATE RANGE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Mulai Berlaku</Label>
            <Input
              type="datetime-local"
              name="starts_at"
              value={form.starts_at}
              onChange={onChange}
            />
          </div>

          <div>
            <Label>Berlaku Sampai</Label>
            <Input
              type="datetime-local"
              name="expires_at"
              value={form.expires_at}
              onChange={onChange}
            />
          </div>
        </div>

        {/* STATUS */}
        <div>
          <Label>Status</Label>
          <select
            name="is_active"
            value={form.is_active}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          >
            <option value={1}>Aktif</option>
            <option value={0}>Nonaktif</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loadingSubmit}
          className="rounded-lg bg-brand-500 px-6 py-3 text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {loadingSubmit
            ? "Menyimpan..."
            : isEdit
            ? "Update Voucher"
            : "Simpan Voucher"}
        </button>
      </form>
    </ComponentCard>
  );
};

export default VoucherForm;
