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

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/orders?page=${page}`);

      setOrders(response.data.data);
      setCurrentPage(response.data.meta?.current_page ?? 1);
      setLastPage(response.data.meta?.last_page ?? 1);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data orders");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (value) => `Rp ${Number(value).toLocaleString("id-ID")}`;

  const paymentBadgeColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "unpaid":
        return "warning";
      case "expired":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-gray-500 text-theme-sm">
        Loading data orders...
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
                  Order
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Tanggal
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
                  Total
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Kurir
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-theme-xs text-gray-500"
                >
                  Items
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  {/* ORDER NUMBER */}
                  <TableCell className="px-5 py-4">
                    <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {order.order_number}
                    </span>
                  </TableCell>

                  {/* TANGGAL */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {order.created_at_formatted}
                  </TableCell>

                  {/* STATUS */}
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={paymentBadgeColor(order.payment_status)}
                    >
                      {order.payment_status}
                    </Badge>
                  </TableCell>

                  {/* TOTAL */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {formatRupiah(order.total_amount)}
                  </TableCell>

                  {/* COURIER */}
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {order.courier?.code?.toUpperCase()} -{" "}
                    {order.courier?.service}
                  </TableCell>

                  {/* ITEMS */}
                  <TableCell className="px-4 py-3">
                    <div className="space-y-2">
                      {order.items?.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <img
                            src={item.product?.image_url}
                            alt={item.product?.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {item.product?.name} x{item.quantity}
                          </span>
                        </div>
                      ))}

                      {order.items?.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{order.items.length - 2} item lagi
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* AKSI */}
                  <TableCell className="px-4 py-3">
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="text-blue-600 hover:underline text-theme-sm"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* ================= PAGINATION ================= */}
      <div className="mt-4 flex items-center justify-between px-2">
        <span className="text-sm text-gray-500">
          Halaman {currentPage} dari {lastPage}
        </span>

        <div className="flex gap-2">
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
    </>
  );
}
