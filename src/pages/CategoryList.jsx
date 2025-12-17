import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiTshirtCrew,
  mdiLaptop,
  mdiWatch,
  mdiHeartPulse,
  mdiRun,
  mdiSofa,
  mdiBottleTonicPlus,
  mdiBabyFace,
  mdiFoodApple,
  mdiBookOpenVariant,
  mdiDog,
  mdiCar,
  mdiMovieOpen,
  mdiFlower,
  mdiCamera,
  mdiGamepadVariant,
  mdiTools,
  mdiSilverwareForkKnife,
  mdiOfficeBuilding,
  mdiHomeCity,
} from "@mdi/js";

export default function CategoryList() {
  const categories = [
    { id: 1, name: "Fashion", totalProducts: 128, icon: mdiTshirtCrew },
    { id: 2, name: "Elektronik", totalProducts: 92, icon: mdiLaptop },
    { id: 3, name: "Aksesoris", totalProducts: 76, icon: mdiWatch },
    { id: 4, name: "Kesehatan", totalProducts: 41, icon: mdiHeartPulse },
    { id: 5, name: "Olahraga", totalProducts: 64, icon: mdiRun },
    { id: 6, name: "Rumah Tangga", totalProducts: 53, icon: mdiSofa },
    {
      id: 7,
      name: "Obat & Suplemen",
      totalProducts: 34,
      icon: mdiBottleTonicPlus,
    },
    { id: 8, name: "Bayi & Anak", totalProducts: 48, icon: mdiBabyFace },
    { id: 9, name: "Makanan & Minuman", totalProducts: 86, icon: mdiFoodApple },
    {
      id: 10,
      name: "Buku & Alat Tulis",
      totalProducts: 45,
      icon: mdiBookOpenVariant,
    },
    { id: 11, name: "Hewan Peliharaan", totalProducts: 25, icon: mdiDog },
    { id: 12, name: "Otomotif", totalProducts: 39, icon: mdiCar },
    { id: 13, name: "Film & Hiburan", totalProducts: 22, icon: mdiMovieOpen },
    { id: 14, name: "Taman & Tanaman", totalProducts: 31, icon: mdiFlower },
    { id: 15, name: "Fotografi", totalProducts: 27, icon: mdiCamera },
    { id: 16, name: "Gaming", totalProducts: 55, icon: mdiGamepadVariant },
    { id: 17, name: "Peralatan Kerja", totalProducts: 44, icon: mdiTools },
    {
      id: 18,
      name: "Peralatan Dapur",
      totalProducts: 51,
      icon: mdiSilverwareForkKnife,
    },
    {
      id: 19,
      name: "Perlengkapan Kantor",
      totalProducts: 36,
      icon: mdiOfficeBuilding,
    },
    { id: 20, name: "Properti & Rumah", totalProducts: 18, icon: mdiHomeCity },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-44 md:pt-40 pb-20">
        <h2 className="text-xl lg:text-2xl font-bold mb-10">Semua Kategori</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/kategori/${cat.id}`}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
                <Icon path={cat.icon} size={2} className="text-blue-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {cat.name}
              </h3>

              <p className="text-sm text-gray-500">
                {cat.totalProducts} produk
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
