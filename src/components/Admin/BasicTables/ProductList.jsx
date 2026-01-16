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

import Badge from "../ui/badge/Badge";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔴 modal delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    setDeleting(true);
    try {
      await api.delete(`/product/delete/${selectedProduct.id}`);

      // hapus dari state
      setProducts((prev) =>
        prev.filter((item) => item.id !== selectedProduct.id)
      );

      closeDeleteModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus produk");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading data produk...
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
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Produk
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Harga
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Stok
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.map((item) => (
                <TableRow key={item.id}>
                  {/* Produk */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-lg border">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/storage/${
                            item.image
                          }`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 dark:text-white/90">
                          {item.name}
                        </span>
                        <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                          {item.category?.name ?? "-"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Harga */}
                  <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </TableCell>

                  {/* Stok */}
                  <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {item.stock}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={item.is_active === 1 ? "success" : "error"}
                    >
                      {item.is_active === 1 ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>

                  {/* Aksi */}
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/dashboard/product/edit/${item.id}`}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Konfirmasi Hapus
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Apakah yakin ingin menghapus produk{" "}
              <span className="font-semibold">{selectedProduct?.name}</span>?
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
