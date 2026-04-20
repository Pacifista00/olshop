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

export default function HotelBookingList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 🔥 booking code state
  const [bookingCode, setBookingCode] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);

      const response = await api.get(`/admin/redemptions/hotel?page=${page}`);
      const res = response.data;

      setData(res.data || []);
      setCurrentPage(res.meta?.current_page || 1);
      setLastPage(res.meta?.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data booking hotel");
    } finally {
      setLoading(false);
    }
  };

  // ================= MODAL =================

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setBookingCode(item.booking_code || "");
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
    setBookingCode("");
    setShowDetailModal(false);
  };

  // ================= UPDATE =================

  const handleUpdateBooking = async () => {
    if (!bookingCode) {
      alert("Booking code wajib diisi");
      return;
    }

    try {
      setSaving(true);

      await api.post(`/admin/redemptions/hotel/${selectedItem.id}/complete`, {
        booking_code: bookingCode,
      });

      // refresh list
      await fetchData(currentPage);

      closeDetailModal();
    } catch (err) {
      console.error(err);
      alert("Gagal update booking code");
    } finally {
      setSaving(false);
    }
  };

  // ================= STATUS COLOR =================

  const statusColor = (status) => {
    switch (status) {
      case "booked":
        return "success";
      case "completed":
        return "primary";
      case "cancelled":
        return "danger";
      default:
        return "warning";
    }
  };

  // ================= UI =================

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-sm">
        Loading data hotel booking...
      </div>
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
                <TableCell isHeader>Kode Booking</TableCell>
                <TableCell isHeader>User</TableCell>
                <TableCell isHeader>Hotel</TableCell>
                <TableCell isHeader>Check In</TableCell>
                <TableCell isHeader>Check Out</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
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
                    <TableCell>
                      {item.booking_code || (
                        <span className="text-gray-400 italic">Belum ada</span>
                      )}
                    </TableCell>

                    <TableCell>{item.user?.name || "-"}</TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium">{item.hotel_name}</p>
                        <p className="text-xs text-gray-400">
                          {item.room_type}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      {new Date(item.check_in).toLocaleDateString("id-ID")}
                    </TableCell>

                    <TableCell>
                      {new Date(item.check_out).toLocaleDateString("id-ID")}
                    </TableCell>

                    <TableCell>
                      <Badge size="sm" color={statusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>

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

      {/* ================= MODAL ================= */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Detail Booking
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <b>User:</b> {selectedItem.user?.name || "-"}
              </div>

              <div>
                <b>Hotel:</b> {selectedItem.hotel_name}
              </div>

              <div>
                <b>Kamar:</b> {selectedItem.room_type}
              </div>

              <div>
                <b>Lokasi:</b> {selectedItem.location}
              </div>

              <div>
                <b>Check In:</b>{" "}
                {new Date(selectedItem.check_in).toLocaleDateString("id-ID")}
              </div>

              <div>
                <b>Check Out:</b>{" "}
                {new Date(selectedItem.check_out).toLocaleDateString("id-ID")}
              </div>

              <div>
                <b>Status:</b>{" "}
                <Badge size="sm" color={statusColor(selectedItem.status)}>
                  {selectedItem.status}
                </Badge>
              </div>

              {/* 🔥 INPUT BOOKING CODE */}
              <div>
                <b>Booking Code:</b>
                <input
                  type="text"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Masukkan booking code"
                />
              </div>
            </div>

            {/* 🔥 ACTION */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeDetailModal}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Tutup
              </button>

              <button
                onClick={handleUpdateBooking}
                disabled={saving}
                className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
