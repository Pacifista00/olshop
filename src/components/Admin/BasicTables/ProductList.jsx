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
    product: {
      image: "/images/product/product-1.jpg",
      name: "Keyboard Mechanical",
      category: "Aksesoris",
    },
    price: 750000,
    stock: 12,
    isActive: true,
  },
  {
    id: 2,
    product: {
      image: "/images/product/product-2.jpg",
      name: "Mouse Gaming",
      category: "Aksesoris",
    },
    price: 350000,
    stock: 0,
    isActive: false,
  },
  {
    id: 3,
    product: {
      image: "/images/product/product-3.jpg",
      name: "Monitor 24 Inch",
      category: "Elektronik",
    },
    price: 2450000,
    stock: 8,
    isActive: true,
  },
  {
    id: 4,
    product: {
      image: "/images/product/product-4.jpg",
      name: "Headset Wireless",
      category: "Audio",
    },
    price: 980000,
    stock: 3,
    isActive: true,
  },
];

export default function ProductList() {
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
                Produk
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Harga
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stok
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aktif
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
                {/* Produk */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-lg border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.product.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.product.category}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Harga */}
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  Rp {item.price.toLocaleString("id-ID")}
                </TableCell>

                {/* Stok */}
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {item.stock}
                </TableCell>

                {/* Aktif */}
                <TableCell className="px-4 py-3 text-start">
                  <Badge size="sm" color={item.isActive ? "success" : "error"}>
                    {item.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>

                {/* Aksi */}
                <TableCell className="px-4 py-3 text-start">
                  <div className="flex gap-2">
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
