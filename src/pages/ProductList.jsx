import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

export default function ProductList() {
  const products = [
    {
      id: 1,
      name: "Kemeja Pria Polos Premium Bahan Katun Lembut Nyaman Dipakai Seharian",
      price: 185000,
      stock: 24,
      image: "https://picsum.photos/300?random=1",
    },
    {
      id: 2,
      name: "Tas Ransel Waterproof Anti Air dengan Kompartemen Laptop Hingga 15 Inch",
      price: 230000,
      stock: 15,
      image: "https://picsum.photos/300?random=2",
    },
    {
      id: 3,
      name: "Sepatu Sneakers Classic Ringan Cocok untuk Aktivitas Harian dan Olahraga",
      price: 350000,
      stock: 12,
      image: "https://picsum.photos/300?random=3",
    },
    {
      id: 4,
      name: "Headset Wireless Bass Boost Suara Jernih dengan Mikrofon Noise Cancelling",
      price: 290000,
      stock: 19,
      image: "https://picsum.photos/300?random=4",
    },
    {
      id: 5,
      name: "Jaket Hoodie Fleece Tebal Hangat Cocok untuk Cuaca Dingin dan Santai",
      price: 199000,
      stock: 30,
      image: "https://picsum.photos/300?random=5",
    },
    {
      id: 6,
      name: "Smartwatch Fitness Tracker Layar Full Touch dengan Mode Olahraga Lengkap",
      price: 425000,
      stock: 18,
      image: "https://picsum.photos/300?random=6",
    },
    {
      id: 7,
      name: "Earphone Type-C Bass Boost Kualitas Suara Jernih untuk Musik dan Gaming",
      price: 99000,
      stock: 40,
      image: "https://picsum.photos/300?random=7",
    },
    {
      id: 8,
      name: "Kacamata Anti Radiasi Blue Light Protection Frame Ringan Elegan",
      price: 75000,
      stock: 27,
      image: "https://picsum.photos/300?random=8",
    },
    {
      id: 9,
      name: "Keyboard Wireless Slim Hemat Baterai Cocok untuk Laptop dan PC",
      price: 165000,
      stock: 22,
      image: "https://picsum.photos/300?random=9",
    },
    {
      id: 10,
      name: "Mouse Wireless Silent Click Desain Ergonomis Nyaman Digunakan Lama",
      price: 85000,
      stock: 35,
      image: "https://picsum.photos/300?random=10",
    },
    {
      id: 11,
      name: "Topi Baseball Premium Adjustable Strap Unisex Nyaman Dipakai Outdoor",
      price: 65000,
      stock: 20,
      image: "https://picsum.photos/300?random=11",
    },
    {
      id: 12,
      name: "Celana Jogger Pria Bahan Polyester Stretch Nyaman untuk Aktivitas",
      price: 120000,
      stock: 14,
      image: "https://picsum.photos/300?random=12",
    },
    {
      id: 13,
      name: "Charger Fast Charging 20W Output Stabil Aman untuk Semua Smartphone",
      price: 115000,
      stock: 28,
      image: "https://picsum.photos/300?random=13",
    },
    {
      id: 14,
      name: "Powerbank 20000mAh Quick Charge Dual Output Tahan Lama dan Praktis",
      price: 275000,
      stock: 17,
      image: "https://picsum.photos/300?random=14",
    },
    {
      id: 15,
      name: "Lampu Meja LED Minimalis Brightness Adjustable untuk Belajar dan Kerja",
      price: 145000,
      stock: 16,
      image: "https://picsum.photos/300?random=15",
    },
    {
      id: 16,
      name: "Dompet Kulit Premium Slim Desain Elegan dengan Banyak Slot Kartu",
      price: 135000,
      stock: 21,
      image: "https://picsum.photos/300?random=16",
    },
    {
      id: 17,
      name: "Tumbler Stainless Steel 500ml Insulated Panas Dingin Tahan Lama",
      price: 89000,
      stock: 25,
      image: "https://picsum.photos/300?random=17",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
        {/* Title + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
            Daftar Produk
          </h2>

          {/* Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4 md:mt-0 text-sm text-gray-800">
            {/* Kategori */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              {["Semua Kategori", "Fashion", "Elektronik", "Aksesoris"].map(
                (item, i) => (
                  <option key={i}>{item}</option>
                )
              )}
            </select>

            {/* Sorting */}
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm 
               focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            >
              {["Urutkan", "Harga Terendah", "Harga Tertinggi", "Nama A-Z"].map(
                (item, i) => (
                  <option key={i}>{item}</option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition p-4 flex flex-col h-full"
            >
              {/* Tombol Tambah Keranjang */}
              <button
                className="absolute bottom-3 right-3 bg-white-700 text-gray-800 rounded-full p-1 
               shadow-md hover:bg-gray-700 hover:text-white transition active:scale-90"
              >
                <Icon path={mdiPlus} size={0.8} />
              </button>

              {/* Foto Produk */}
              <div className="rounded-lg h-32 sm:h-48 lg:h-56 xl:h-48 overflow-hidden flex items-center justify-center mb-4 bg-gray-100 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Info Produk */}
              <p className="text-xs text-gray-500">Stok: {item.stock}</p>

              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
                {item.name}
              </h3>

              <div className="mt-auto">
                <p className="text-blue-600 font-bold text-sm">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
