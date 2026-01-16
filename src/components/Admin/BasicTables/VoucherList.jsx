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

export default function VoucherList() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔴 modal delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await api.get("/vouchers");
        setVouchers(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data voucher");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const openDeleteModal = (voucher) => {
    setSelectedVoucher(voucher);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedVoucher(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!selectedVoucher) return;

    setDeleting(true);
    try {
      await api.delete(`/voucher/delete/${selectedVoucher.id}`);

      // hapus dari state tanpa reload
      setVouchers((prev) =>
        prev.filter((item) => item.id !== selectedVoucher.id)
      );

      closeDeleteModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus voucher");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading data voucher...
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
                  Nama
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Kode
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Tipe
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Value
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Max Diskon
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Min Order
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
              {vouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  {/* Nama */}
                  <TableCell className="px-5 py-4">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {voucher.name}
                    </span>
                  </TableCell>

                  {/* Kode */}
                  <TableCell className="px-4 py-3 text-theme-sm font-mono text-gray-600 dark:text-gray-300">
                    {voucher.code}
                  </TableCell>

                  {/* Tipe */}
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={voucher.type === "percentage" ? "info" : "warning"}
                    >
                      {voucher.type === "percentage" ? "Persen" : "Nominal"}
                    </Badge>
                  </TableCell>

                  {/* Value */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {voucher.type === "percentage"
                      ? `${Number(voucher.value)}%`
                      : `Rp ${Number(voucher.value).toLocaleString("id-ID")}`}
                  </TableCell>

                  {/* Max Diskon */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    Rp {Number(voucher.max_discount).toLocaleString("id-ID")}
                  </TableCell>

                  {/* Min Order */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    Rp{" "}
                    {Number(voucher.min_order_amount).toLocaleString("id-ID")}
                  </TableCell>

                  {/* Aksi */}
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/dashboard/voucher/edit/${voucher.id}`}
                        className="text-blue-600 hover:underline text-theme-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => openDeleteModal(voucher)}
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
              Apakah yakin ingin menghapus voucher{" "}
              <span className="font-semibold">{selectedVoucher?.name}</span>?
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
