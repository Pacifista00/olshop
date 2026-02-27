import ComponentCard from "../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Label from "./Label";
import Input from "./input/InputField";
import Select from "./Select";
import api from "../../../services/Api";

const ProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    is_active: 1,
    use_dimension: 0,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  /* ======================
     INPUT CHANGE
  ====================== */
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     FETCH CATEGORY
  ====================== */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(
        res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        })),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategory(false);
    }
  };

  /* ======================
     FETCH PRODUCT (EDIT)
  ====================== */
  const fetchProduct = async () => {
    try {
      setLoadingProduct(true);
      const res = await api.get(`/product/${id}`);
      const product = res.data.data;

      setForm({
        category_id: product.category?.id,
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        stock: product.stock,
        weight: product.weight ?? "",
        length: product.dimension?.length ?? "",
        width: product.dimension?.width ?? "",
        height: product.dimension?.height ?? "",
        is_active: product.is_active ? 1 : 0,
        use_dimension: product.use_dimension ? 1 : 0,
      });

      setPreview(product.image_url);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data produk");
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [id]);

  /* ======================
     DROPZONE IMAGE
  ====================== */
  const onDrop = (files) => {
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== "" && form[key] !== null) {
        if (key === "is_active") {
          formData.append(key, Number(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      }
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoadingSubmit(true);

      if (isEdit) {
        formData.append("_method", "PUT");
        await api.post(`/product/update/${id}`, formData);
        alert("Produk berhasil diperbarui");
      } else {
        await api.post("/product/store", formData);
        alert("Produk berhasil ditambahkan");
      }

      navigate("/dashboard/product");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingProduct) {
    return <p className="text-center">Memuat data produk...</p>;
  }

  return (
    <ComponentCard title={isEdit ? "Edit Produk" : "Tambah Produk"}>
      <form className="space-y-6" onSubmit={onSubmit}>
        {/* IMAGE */}
        <div
          {...getRootProps()}
          className="border border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-brand-500"
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-32 object-cover rounded"
            />
          ) : (
            <p className="text-sm text-gray-600">
              Drag & drop gambar produk atau klik
            </p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <Label>Kategori</Label>
          <Select
            options={categories}
            value={form.category_id}
            placeholder={
              loadingCategory ? "Memuat kategori..." : "Pilih kategori"
            }
            onChange={(value) => setForm({ ...form, category_id: value })}
          />
        </div>

        {/* NAME */}
        <div>
          <Label>Nama Produk</Label>
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
            min={0}
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
            min={0}
            required
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
            min={0}
          />
        </div>

        {/* DIMENSIONS */}
        {/* USE DIMENSION */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.use_dimension === 1}
            onChange={(e) =>
              setForm({
                ...form,
                use_dimension: e.target.checked ? 1 : 0,
              })
            }
            className="h-4 w-4"
          />
          <Label>Gunakan perhitungan dimensi (produk besar)</Label>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Panjang (cm)</Label>
            <Input
              type="number"
              name="length"
              value={form.length}
              onChange={onChange}
              min={0}
              disabled={form.use_dimension !== 1}
            />
          </div>
          <div>
            <Label>Lebar (cm)</Label>
            <Input
              type="number"
              name="width"
              value={form.width}
              onChange={onChange}
              min={0}
              disabled={form.use_dimension !== 1}
            />
          </div>
          <div>
            <Label>Tinggi (cm)</Label>
            <Input
              type="number"
              name="height"
              value={form.height}
              onChange={onChange}
              min={0}
              disabled={form.use_dimension !== 1}
            />
          </div>
        </div>

        {/* STATUS */}
        <div>
          <Label>Status</Label>
          <select
            name="is_active"
            value={form.is_active}
            onChange={(e) =>
              setForm({ ...form, is_active: Number(e.target.value) })
            }
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
              ? "Update Produk"
              : "Simpan Produk"}
        </button>
      </form>
    </ComponentCard>
  );
};

export default ProductForm;
