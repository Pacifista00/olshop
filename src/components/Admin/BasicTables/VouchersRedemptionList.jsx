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

export default function VoucherRedemptionList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/redemptions/voucher?page=${page}`);
      const res = response.data;

      setData(res.data || []);
      setCurrentPage(res.meta?.current_page || 1);
      setLastPage(res.meta?.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data voucher");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="p-5 text-gray-500 text-sm">Loading data voucher...</div>
    );
  }

  if (error) {
    return <div className="p-5 text-red-500 text-sm">{error}</div>;
  }

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Kode</TableCell>
                <TableCell isHeader>User</TableCell>
                <TableCell isHeader>Nama Voucher</TableCell>
                <TableCell isHeader>Digunakan</TableCell>
                <TableCell isHeader>Tanggal</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-gray-400"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    {/* KODE */}
                    <TableCell>{item.code}</TableCell>

                    {/* NAMA */}
                    <TableCell>{item.user?.name || "-"}</TableCell>
                    <TableCell>{item.name}</TableCell>

                    {/* DIGUNAKAN */}
                    <TableCell>
                      {item.usage_count} / {item.usage_limit || "-"}
                    </TableCell>

                    {/* TANGGAL */}
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </TableCell>

                    {/* AKSI */}
                    <TableCell>
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
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Detail Voucher
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <b>Kode:</b> {selectedItem.code}
              </div>

              {/* ✅ USER */}
              <div>
                <b>User:</b> {selectedItem.user?.name || "-"}
              </div>

              <div>
                <b>Nama:</b> {selectedItem.name}
              </div>

              <div>
                <b>Tipe:</b> {selectedItem.type}
              </div>

              <div>
                <b>Nilai:</b>{" "}
                {selectedItem.type === "percentage"
                  ? `${selectedItem.value}%`
                  : `Rp ${Number(selectedItem.value).toLocaleString("id-ID")}`}
              </div>

              <div>
                <b>Min Order:</b>{" "}
                {selectedItem.min_order_amount
                  ? `Rp ${Number(selectedItem.min_order_amount).toLocaleString("id-ID")}`
                  : "-"}
              </div>

              <div>
                <b>Max Discount:</b>{" "}
                {selectedItem.max_discount
                  ? `Rp ${Number(selectedItem.max_discount).toLocaleString("id-ID")}`
                  : "-"}
              </div>

              <div>
                <b>Digunakan:</b> {selectedItem.usage_count} /{" "}
                {selectedItem.usage_limit || "-"}
              </div>

              <div>
                <b>Mulai:</b>{" "}
                {selectedItem.starts_at
                  ? new Date(selectedItem.starts_at).toLocaleDateString("id-ID")
                  : "-"}
              </div>

              <div>
                <b>Berakhir:</b>{" "}
                {selectedItem.expires_at
                  ? new Date(selectedItem.expires_at).toLocaleDateString(
                      "id-ID",
                    )
                  : "-"}
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
