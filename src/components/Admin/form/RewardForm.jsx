import ComponentCard from "../common/ComponentCard";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Label from "./Label";
import Input from "./input/InputField";
import Select from "./Select";
import api from "../../../services/Api";

const RewardForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "voucher",
    points_required: "",
    stock: "",
    is_active: 1,

    // voucher
    voucher_type: "",
    voucher_value: "",
    max_discount: "",
    min_order_amount: "",

    // product
    product_name: "",
    product_price: "",
    need_shipping: 0,

    // hotel
    hotel_name: "",
    room_type: "",
    location: "",
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  /* ======================
     HANDLE CHANGE
  ====================== */
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     FETCH DATA (EDIT)
  ====================== */
  const fetchReward = async () => {
    try {
      setLoadingData(true);
      const res = await api.get(`/reward/${id}`);
      const reward = res.data.data;
      console.log(reward);

      setForm({
        name: reward.name,
        description: reward.description ?? "",
        type: reward.type,
        points_required: reward.points_required,
        stock: reward.stock ?? "",
        is_active: reward.is_active ? 1 : 0,

        voucher_type: reward.voucher_type ?? "",
        voucher_value: reward.voucher_value ?? "",
        max_discount: reward.max_discount ?? "",
        min_order_amount: reward.min_order_amount ?? "",

        product_name: reward.product_name ?? "",
        product_price: reward.product_price ?? "",
        need_shipping: reward.need_shipping ? 1 : 0,

        hotel_name: reward.hotel_name ?? "",
        room_type: reward.room_type ?? "",
        location: reward.location ?? "",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data reward");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchReward();
  }, [id]);

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingSubmit(true);

      let payload = { ...form };

      // convert boolean-like
      payload.is_active = Number(payload.is_active);
      payload.need_shipping = Number(payload.need_shipping);

      if (isEdit) {
        await api.put(`/admin/reward/update/${id}`, payload);
        alert("Reward berhasil diperbarui");
      } else {
        await api.post(`/admin/reward/store`, payload);
        alert("Reward berhasil ditambahkan");
      }

      navigate("/dashboard/rewards");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan reward");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingData) {
    return <p className="text-center">Memuat data reward...</p>;
  }

  return (
    <ComponentCard title={isEdit ? "Edit Reward" : "Tambah Reward"}>
      <form className="space-y-6" onSubmit={onSubmit}>
        {/* NAME */}
        <div>
          <Label>Nama Reward</Label>
          <Input name="name" value={form.name} onChange={onChange} required />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Deskripsi</Label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* TYPE */}
        <div>
          <Label>Tipe</Label>
          <Select
            options={[
              { value: "voucher", label: "Voucher" },
              { value: "product", label: "Produk" },
              { value: "hotel", label: "Hotel" },
            ]}
            value={form.type}
            onChange={(value) => setForm({ ...form, type: value })}
          />
        </div>

        {/* POINT */}
        <div>
          <Label>Poin Dibutuhkan</Label>
          <Input
            type="number"
            name="points_required"
            value={form.points_required}
            onChange={onChange}
            required
          />
        </div>

        {/* STOCK */}
        <div>
          <Label>Stok</Label>
          <Input
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
          />
        </div>

        {/* ================= VOUCHER ================= */}
        {form.type === "voucher" && (
          <>
            <div>
              <Label>Tipe Voucher</Label>
              <Select
                options={[
                  { value: "percentage", label: "Percentage" },
                  { value: "fixed", label: "Fixed" },
                ]}
                value={form.voucher_type}
                onChange={(value) => setForm({ ...form, voucher_type: value })}
              />
            </div>
            <Label>Nilai Vouher</Label>
            <Input
              name="voucher_value"
              value={form.voucher_value}
              onChange={onChange}
              placeholder="Nilai Voucher"
            />
            <Label>Diskon Maksimal</Label>
            <Input
              name="max_discount"
              value={form.max_discount}
              onChange={onChange}
              placeholder="Max Diskon"
            />
            <Label>Minimal Belanja</Label>
            <Input
              name="min_order_amount"
              value={form.min_order_amount}
              onChange={onChange}
              placeholder="Min Order"
            />
          </>
        )}

        {/* ================= PRODUCT ================= */}
        {form.type === "product" && (
          <>
            <Label>Nama Produk</Label>
            <Input
              name="product_name"
              value={form.product_name}
              onChange={onChange}
              placeholder="Nama Produk"
            />
            <Label>Harga Produk</Label>
            <Input
              name="product_price"
              value={form.product_price}
              onChange={onChange}
              placeholder="Harga Produk"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.need_shipping === 1}
                onChange={(e) =>
                  setForm({
                    ...form,
                    need_shipping: e.target.checked ? 1 : 0,
                  })
                }
              />
              <Label>Butuh Pengiriman</Label>
            </div>
          </>
        )}

        {/* ================= HOTEL ================= */}
        {form.type === "hotel" && (
          <>
            <Label>Nama Hotel</Label>
            <Input
              name="hotel_name"
              value={form.hotel_name}
              onChange={onChange}
              placeholder="Nama Hotel"
            />
            <Label>Tipe Ruangan</Label>
            <Input
              name="room_type"
              value={form.room_type}
              onChange={onChange}
              placeholder="Tipe Kamar"
            />
            <Label>Lokasi</Label>
            <Input
              name="location"
              value={form.location}
              onChange={onChange}
              placeholder="Lokasi"
            />
          </>
        )}

        {/* STATUS */}
        <div>
          <Label>Status</Label>
          <select
            value={form.is_active}
            onChange={(e) =>
              setForm({ ...form, is_active: Number(e.target.value) })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value={1}>Aktif</option>
            <option value={0}>Nonaktif</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loadingSubmit}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {loadingSubmit
            ? "Menyimpan..."
            : isEdit
              ? "Update Reward"
              : "Simpan Reward"}
        </button>
      </form>
    </ComponentCard>
  );
};

export default RewardForm;
