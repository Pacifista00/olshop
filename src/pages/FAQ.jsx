import { useState } from "react";
import { mdiChevronDown, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import SubHeadingCenter from "../components/SubHeadingCenter";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const categories = [
    {
      title: "Umum",
      items: [
        {
          q: "Apa itu layanan ini?",
          a: "Kami adalah platform e-commerce yang menyediakan berbagai kebutuhan Anda mulai dari produk digital hingga barang fisik.",
        },
        {
          q: "Apakah layanan ini gratis digunakan?",
          a: "Ya, Anda dapat mengakses seluruh halaman dan fitur secara gratis. Namun, beberapa layanan premium mungkin berbayar.",
        },
      ],
    },
    {
      title: "Pembayaran",
      items: [
        {
          q: "Metode pembayaran apa saja yang tersedia?",
          a: "Kami mendukung transfer bank, e-wallet (OVO, GoPay, Dana), kartu kredit, dan pembayaran melalui gerai retail.",
        },
        {
          q: "Apakah pembayaran aman?",
          a: "Seluruh transaksi menggunakan enkripsi SSL 256-bit & sistem keamanan tingkat lanjut untuk melindungi data Anda.",
        },
        {
          q: "Bisakah saya membayar ketika barang sampai?",
          a: "Ya, Cash on Delivery (COD) tersedia untuk wilayah tertentu.",
        },
      ],
    },
    {
      title: "Pengiriman",
      items: [
        {
          q: "Berapa lama proses pengiriman?",
          a: "Estimasi pengiriman 1–3 hari untuk wilayah Jabodetabek dan 2–7 hari untuk wilayah lainnya.",
        },
        {
          q: "Jasa ekspedisi apa yang digunakan?",
          a: "Kami bekerja sama dengan JNE, J&T, SiCepat, AnterAja, dan Pos Indonesia.",
        },
        {
          q: "Bagaimana cara melacak pesanan saya?",
          a: "Setelah pesanan dikirim, Anda akan menerima nomor resi yang dapat dilacak melalui halaman tracking.",
        },
      ],
    },
    {
      title: "Akun",
      items: [
        {
          q: "Bagaimana cara membuat akun?",
          a: "Anda cukup mendaftar menggunakan email atau akun Google/Facebook.",
        },
        {
          q: "Saya lupa password. Apa yang harus saya lakukan?",
          a: "Gunakan fitur lupa password lalu masukkan email Anda untuk mereset kata sandi.",
        },
        {
          q: "Apakah saya bisa menghapus akun?",
          a: "Ya, Anda dapat menghapus akun melalui menu Pengaturan → Keamanan.",
        },
      ],
    },
    {
      title: "Produk",
      items: [
        {
          q: "Apakah produk memiliki garansi?",
          a: "Sebagian besar produk memiliki garansi resmi 1 tahun. Cek deskripsi produk untuk info detail.",
        },
        {
          q: "Apakah gambar produk sesuai dengan barang yang dikirim?",
          a: "Kami berusaha menampilkan gambar produk seakurat mungkin, namun warna dapat sedikit berbeda tergantung layar perangkat.",
        },
      ],
    },
  ];

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.q.toLowerCase().includes(search.toLowerCase()),
    ),
  }));

  const handleToggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  let indexCounter = 0;

  return (
    <div className="text-gray-800">
      <section className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40">
        <SubHeadingCenter className="text-gray-800">
          Frequently Asked Questions
        </SubHeadingCenter>
        <p className="text-xs lg:text-sm text-center text-gray-600 mb-8">
          Temukan jawaban dari pertanyaan yang paling sering ditanyakan.
        </p>

        {/* Search Bar */}
        {/* <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Icon
              path={mdiMagnify}
              size={1}
              className="absolute left-3 top-3 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan…"
              className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div> */}

        {/* FAQ List */}
        {filteredCategories.map((cat, catIndex) =>
          cat.items.length > 0 ? (
            <div key={catIndex} className="mb-10">
              <h2 className="text-sm lg:text-lg font-bold border-l-4 border-blue-500 pl-3 mb-4">
                {cat.title}
              </h2>

              <div className="space-y-3 text-xs lg:text-sm">
                {cat.items.map((item, itemIndex) => {
                  const currentIndex = indexCounter++;
                  const isOpen = openIndex === currentIndex;

                  return (
                    <div
                      key={currentIndex}
                      className="border rounded-xl px-3 py-1 lg:py-3 transition hover:shadow-md"
                    >
                      <button
                        onClick={() => handleToggle(currentIndex)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <span className="font-semibold">{item.q}</span>
                        <Icon
                          path={mdiChevronDown}
                          size={1}
                          className={`transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Jawaban */}
                      <div
                        className={` text-gray-600 text-xs lg:text-sm overflow-hidden transition-all ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null,
        )}

        {/* Bantuan */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-xs lg:text-sm">
            Masih mengalami kendala? Kami siap membantu.
          </p>
          <a
            href="#"
            className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition text-xs lg:text-sm"
          >
            Hubungi Customer Support
          </a>
        </div>
      </section>
    </div>
  );
}
