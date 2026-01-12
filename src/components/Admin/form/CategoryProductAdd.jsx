import ComponentCard from "../common/ComponentCard";
import React, { useState } from "react";
import Label from "./Label";
import Input from "./input/InputField";
import { useDropzone } from "react-dropzone";

const CategoryProductAdd = () => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: null,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDrop = (files) => {
    setForm({ ...form, icon: files[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <ComponentCard title="Tambah Kategori">
      <form className="space-y-6">
        {/* NAME */}
        <div>
          <Label>Nama Kategori</Label>
          <Input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Elektronik"
          />
        </div>

        {/* SLUG */}
        <div>
          <Label>Slug</Label>
          <Input
            name="slug"
            value={form.slug}
            onChange={onChange}
            placeholder="elektronik"
          />
        </div>

        {/* ICON */}
        <div>
          <Label>Icon (Optional)</Label>
          <div
            {...getRootProps()}
            className="cursor-pointer rounded-xl border border-dashed p-6 text-center"
          >
            <input {...getInputProps()} />
            {form.icon ? (
              <p className="text-sm text-green-600">{form.icon.name}</p>
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
          className="rounded-lg bg-brand-500 px-6 py-3 text-white"
        >
          Simpan Kategori
        </button>
      </form>
    </ComponentCard>
  );
};

export default CategoryProductAdd;
