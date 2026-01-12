import ComponentCard from "../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import React, { useState } from "react";
import Label from "./Label";
import Input from "./input/InputField";
import Select from "./Select";

const ProductAdd = () => {
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    weight: "",
    stock: "",
    length: "",
    width: "",
    height: "",
    is_active: 1,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDrop = (files) => {
    console.log("Image:", files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const categoryOptions = [
    { value: "uuid-cat-1", label: "Elektronik" },
    { value: "uuid-cat-2", label: "Fashion" },
  ];

  return (
    <ComponentCard title="Tambah Produk">
      <form className="space-y-6">
        {/* IMAGE */}
        <div
          {...getRootProps()}
          className="border border-dashed rounded-xl p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600">
            Drag & drop gambar produk atau klik
          </p>
        </div>

        {/* CATEGORY */}
        <div>
          <Label>Kategori</Label>
          <Select
            options={categoryOptions}
            onChange={(value) => setForm({ ...form, category_id: value })}
            placeholder="Pilih kategori"
          />
        </div>

        {/* NAME */}
        <div>
          <Label>Nama Produk</Label>
          <Input name="name" value={form.name} onChange={onChange} />
        </div>

        {/* SLUG */}
        <div>
          <Label>Slug</Label>
          <Input
            name="slug"
            value={form.slug}
            onChange={onChange}
            placeholder="nama-produk"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Deskripsi</Label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            rows={4}
          />
        </div>

        {/* PRICE */}
        <div>
          <Label>Harga</Label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
          />
        </div>

        {/* WEIGHT */}
        <div>
          <Label>Berat (gram)</Label>
          <Input
            type="number"
            name="weight"
            value={form.weight}
            onChange={onChange}
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

        {/* DIMENSION */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Panjang</Label>
            <Input
              type="number"
              name="length"
              value={form.length}
              onChange={onChange}
            />
          </div>
          <div>
            <Label>Lebar</Label>
            <Input
              type="number"
              name="width"
              value={form.width}
              onChange={onChange}
            />
          </div>
          <div>
            <Label>Tinggi</Label>
            <Input
              type="number"
              name="height"
              value={form.height}
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
          Simpan Produk
        </button>
      </form>
    </ComponentCard>
  );
};

export default ProductAdd;
