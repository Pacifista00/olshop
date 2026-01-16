import { useEffect, useState } from "react";
import api from "../../../services/Api";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ProductCategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔴 modal delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data kategori");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    setDeleting(true);
    try {
      await api.delete(`/category/delete/${selectedCategory.id}`);

      // hapus dari state tanpa reload
      setCategories((prev) =>
        prev.filter((item) => item.id !== selectedCategory.id)
      );

      closeDeleteModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus kategori");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading data kategori...
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-red-500 text-theme-sm">{error}</div>;
  }

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Icon
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Nama Kategori
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {categories.map((item) => (
                <TableRow key={item.id}>
                  {/* Icon */}
                  <TableCell className="px-5 py-4">
                    <div className="w-10 h-10 overflow-hidden rounded-lg border">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${
                          item.icon
                        }`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Nama */}
                  <TableCell className="px-4 py-3 text-theme-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </TableCell>

                  {/* Aksi */}
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/dashboard/product-category/edit/${item.id}`}
                        className="text-blue-600 hover:underline text-theme-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => openDeleteModal(item)}
                        className="text-red-600 hover:underline text-theme-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================= MODAL DELETE ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Konfirmasi Hapus
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Apakah yakin ingin menghapus kategori{" "}
              <span className="font-semibold">{selectedCategory?.name}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                disabled={deleting}
                className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
