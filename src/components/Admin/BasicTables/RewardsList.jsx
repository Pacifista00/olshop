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

export default function RewardsList() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRewards(currentPage);
  }, [currentPage]);

  const fetchRewards = async (page = 1) => {
    try {
      setLoading(true);

      // ⚠️ kalau pakai admin prefix
      const response = await api.get(`/rewards?page=${page}`);
      console.log(response);
      const res = response.data;

      setRewards(res.data || []);
      setCurrentPage(res.data?.meta?.current_page ?? 1);
      setLastPage(res.data?.meta?.last_page ?? 1);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data rewards");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (value) =>
    `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

  const handleDelete = async () => {
    if (!selectedReward) return;

    setDeleting(true);
    try {
      await api.delete(`/admin/reward/delete/${selectedReward.id}`);

      // hapus dari state tanpa reload
      setRewards((prev) =>
        prev.filter((item) => item.id !== selectedReward.id),
      );

      closeDeleteModal();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus reward");
    } finally {
      setDeleting(false);
    }
  };

  const typeBadgeColor = (type) => {
    switch (type) {
      case "voucher":
        return "success";
      case "product":
        return "info";
      case "hotel":
        return "warning";
      default:
        return "secondary";
    }
  };

  const openDeleteModal = (reward) => {
    setSelectedReward(reward);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedReward(null);
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading data rewards...
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
                  Tipe
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Poin
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
                  Digunakan
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
              {rewards.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-400"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                rewards.map((reward) => (
                  <TableRow key={reward.id}>
                    {/* NAME */}
                    <TableCell className="px-5 py-4">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {reward.name}
                        </p>
                      </div>
                    </TableCell>

                    {/* TYPE */}
                    <TableCell className="px-4 py-3">
                      <Badge size="sm" color={typeBadgeColor(reward.type)}>
                        {reward.type}
                      </Badge>
                    </TableCell>

                    {/* POINT */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {reward.points_required}
                    </TableCell>

                    {/* STOCK */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {reward.stock ?? "-"}
                    </TableCell>

                    {/* REDEEMED */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {reward.redeemed_count}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={reward.is_active ? "success" : "danger"}
                      >
                        {reward.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>

                    {/* ACTION */}
                    <TableCell className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => openDeleteModal(reward)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Hapus
                      </button>

                      <Link
                        to={`/dashboard/reward/edit/${reward.id}`}
                        className="text-yellow-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="mt-4 flex items-center justify-between px-2">
        <span className="text-sm text-gray-500">
          Halaman {currentPage} dari {lastPage}
        </span>

        <div className="flex gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-1 text-sm ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          >
            Berikutnya
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Konfirmasi Hapus
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Yakin ingin menghapus reward{" "}
              <span className="font-semibold">{selectedReward?.name}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                disabled={deleting}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
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
