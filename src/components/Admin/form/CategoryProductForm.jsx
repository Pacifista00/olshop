import ComponentCard from "../common/ComponentCard";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import Label from "./Label";
import Input from "./input/InputField";
import api from "../../../services/Api";

const CategoryProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });

  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  /* ======================
     INPUT CHANGE
  ====================== */
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     DROPZONE
  ====================== */
  const onDrop = (files) => {
    const file = files[0];
    setIcon(file);
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  /* ======================
     FETCH CATEGORY (EDIT)
  ====================== */
  const fetchCategory = async () => {
    try {
      setLoadingData(true);
      const res = await api.get(`/category/${id}`);
      const data = res.data.data;

      setForm({
        name: data.name,
      });

      setPreview(data.icon_url); // dari backend
    } catch (err) {
      console.error(err);
      alert("Gagal memuat kategori");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchCategory();
  }, [id]);

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);

    if (icon) {
      formData.append("icon", icon);
    }

    try {
      setLoadingSubmit(true);

      if (isEdit) {
        formData.append("_method", "PUT");
        await api.post(`/category/update/${id}`, formData);
        alert("Kategori berhasil diperbarui");
      } else {
        await api.post("/category/store", formData);
        alert("Kategori berhasil ditambahkan");
      }

      navigate("/dashboard/product-category");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan kategori");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingData) {
    return <p className="text-center">Memuat data kategori...</p>;
  }

  return (
    <ComponentCard title={isEdit ? "Edit Kategori" : "Tambah Kategori"}>
      <form className="space-y-6" onSubmit={onSubmit}>
        {/* NAME */}
        <div>
          <Label>Nama Kategori</Label>
          <Input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Elektronik"
            required
          />
        </div>

        {/* ICON */}
        <div>
          <Label>Icon (Opsional)</Label>
          <div
            {...getRootProps()}
            className="cursor-pointer rounded-xl border border-dashed p-6 text-center hover:border-brand-500"
          >
            <input {...getInputProps()} />
            {preview ? (
              <img
                src={preview}
                alt="Icon"
                className="mx-auto h-20 object-contain"
              />
            ) : (
              <p className="text-sm text-gray-500">
                Upload icon kategori (PNG / SVG)
              </p>
            )}
          </div>
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
            ? "Update Kategori"
            : "Simpan Kategori"}
        </button>
      </form>
    </ComponentCard>
  );
};

export default CategoryProductForm;
