import { useEffect, useState } from "react";
import api from "../../../services/Api";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

export default function RewardsRedemptionList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // ✅ modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/redemptions?page=${page}`);
      const res = response.data;

      const items = res.data?.data || res.data || [];
      const meta = res.data?.meta || {};

      setData(items);
      setCurrentPage(meta.current_page || 1);
      setLastPage(meta.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data penukaran");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  // ✅ modal handler
  const openDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
    setShowDetailModal(false);
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-sm">Loading data penukaran...</div>
    );
  }

  if (error) {
    return <div className="p-5 text-red-500 text-sm">{error}</div>;
  }

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Kode
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  User
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Reward
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Poin
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Status
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Tanggal
                </TableCell>
                <TableCell className="px-5 py-3 text-xs text-gray-500" isHeader>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-400"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {/* KODE */}
                    <TableCell className="px-5 py-4 font-medium text-gray-800">
                      {item.reference_code || "-"}
                    </TableCell>

                    {/* USER */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {item.user?.name || "-"}
                    </TableCell>

                    {/* REWARD */}
                    <TableCell className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {item.reward?.name || "-"}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {item.reward?.type}
                      </p>
                    </TableCell>

                    {/* POIN */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {item.points_used}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-4 py-3">
                      <Badge size="sm" color={statusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>

                    {/* TANGGAL */}
                    <TableCell className="px-4 py-3 text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </TableCell>

                    {/* AKSI */}
                    <TableCell className="px-4 py-3">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Detail
                      </button>
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

      {/* ================= MODAL DETAIL ================= */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Detail Penukaran
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <b>Kode:</b> {selectedItem?.reference_code || "-"}
              </div>

              <div>
                <b>User:</b> {selectedItem?.user?.name || "-"}
              </div>

              <div>
                <b>Reward:</b> {selectedItem?.reward?.name || "-"}
              </div>

              <div>
                <b>Tipe:</b> {selectedItem?.reward?.type}
              </div>

              <div>
                <b>Poin:</b> {selectedItem?.points_used}
              </div>

              <div>
                <b>Status:</b>{" "}
                <Badge size="sm" color={statusColor(selectedItem?.status)}>
                  {selectedItem?.status}
                </Badge>
              </div>

              <div>
                <b>No HP:</b> {selectedItem?.phone || "-"}
              </div>

              <div>
                <b>Detail:</b>
                <pre className="mt-1 bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                  {selectedItem?.details
                    ? JSON.stringify(selectedItem.details, null, 2)
                    : "-"}
                </pre>
              </div>

              {selectedItem?.hotel_booking && (
                <div>
                  <b>Hotel Booking:</b>{" "}
                  {selectedItem.hotel_booking.booking_code}
                </div>
              )}

              {selectedItem?.voucher && (
                <div>
                  <b>Voucher:</b> {selectedItem.voucher.code}
                </div>
              )}

              <div>
                <b>Tanggal:</b>{" "}
                {new Date(selectedItem?.created_at).toLocaleString("id-ID")}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailModal}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
