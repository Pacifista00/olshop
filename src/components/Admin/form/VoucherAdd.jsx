import ComponentCard from "../common/ComponentCard";
import React, { useState } from "react";
import Label from "./Label";
import Input from "./input/InputField";
import Select from "./Select";

const VoucherAdd = () => {
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

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const typeOptions = [
    { value: "percentage", label: "Persentase (%)" },
    { value: "fixed", label: "Nominal (Rp)" },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Voucher Payload:", form);
  };

  return (
    <ComponentCard title="Tambah Voucher">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* CODE */}
        <div>
          <Label>Kode Voucher</Label>
          <Input
            name="code"
            value={form.code}
            onChange={onChange}
            placeholder="DISKON25"
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
          />
        </div>

        {/* MAX DISCOUNT */}
        <div>
          <Label>Maksimal Diskon (Rp)</Label>
          <Input
            type="number"
            name="max_discount"
            value={form.max_discount}
            onChange={onChange}
          />
        </div>

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
          className="rounded-lg bg-brand-500 px-6 py-3 text-white"
        >
          Simpan Voucher
        </button>
      </form>
    </ComponentCard>
  );
};

export default VoucherAdd;
