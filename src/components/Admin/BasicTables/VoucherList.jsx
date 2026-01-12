import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

const tableData = [
  {
    id: 1,
    name: "Diskon Tahun Baru",
    code: "NEWYEAR25",
    type: "percent", // percent | nominal
    value: 25,
    maxDiscount: 50000,
    minOrder: 200000,
  },
  {
    id: 2,
    name: "Voucher Ongkir",
    code: "ONGKIR10",
    type: "nominal",
    value: 10000,
    maxDiscount: 10000,
    minOrder: 50000,
  },
  {
    id: 3,
    name: "Flash Sale",
    code: "FLASH50",
    type: "percent",
    value: 50,
    maxDiscount: 100000,
    minOrder: 300000,
  },
];

export default function VocuherList() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kode
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tipe
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Value
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Max Diskon
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Min Order
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((voucher) => (
              <TableRow key={voucher.id}>
                {/* Nama */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {voucher.name}
                  </span>
                </TableCell>

                {/* Kode */}
                <TableCell className="px-4 py-3 text-start text-theme-sm font-mono text-gray-600 dark:text-gray-300">
                  {voucher.code}
                </TableCell>

                {/* Tipe */}
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={voucher.type === "percent" ? "info" : "warning"}
                  >
                    {voucher.type === "percent" ? "Persen" : "Nominal"}
                  </Badge>
                </TableCell>

                {/* Value */}
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {voucher.type === "percent"
                    ? `${voucher.value}%`
                    : `Rp ${voucher.value.toLocaleString("id-ID")}`}
                </TableCell>

                {/* Max Diskon */}
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  Rp {voucher.maxDiscount.toLocaleString("id-ID")}
                </TableCell>

                {/* Min Order */}
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  Rp {voucher.minOrder.toLocaleString("id-ID")}
                </TableCell>

                {/* Aksi */}
                <TableCell className="px-4 py-3 text-start">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:underline text-theme-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline text-theme-sm">
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
  );
}
