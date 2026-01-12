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
    icon: "/images/category/electronics.png",
    title: "Elektronik",
  },
  {
    id: 2,
    icon: "/images/category/fashion.png",
    title: "Fashion",
  },
  {
    id: 3,
    icon: "/images/category/food.png",
    title: "Makanan & Minuman",
  },
  {
    id: 4,
    icon: "/images/category/health.png",
    title: "Kesehatan",
  },
  {
    id: 5,
    icon: "/images/category/accessories.png",
    title: "Aksesoris",
  },
];

export default function ProductCategoryList() {
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
                Icon
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Judul
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
            {tableData.map((item) => (
              <TableRow key={item.id}>
                {/* Icon */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="w-10 h-10 overflow-hidden rounded-lg border">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>

                {/* Judul */}
                <TableCell className="px-4 py-3 text-start text-theme-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
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
