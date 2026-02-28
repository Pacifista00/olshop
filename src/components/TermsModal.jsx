import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TermsModal({ isOpen, onClose }) {
  const title = import.meta.env.VITE_APP_NAME;
  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header (sticky) */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
              <h2 className="text-lg font-semibold">Syarat dan Ketentuan</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 overflow-y-auto space-y-3 text-xs lg:text-sm text-gray-700 leading-relaxed">
              <p>
                Syarat dan Ketentuan ini mengatur penggunaan layanan pada{" "}
                <strong> {title}</strong>. Dengan mengakses, menggunakan, atau
                melakukan transaksi di website kami, Anda menyatakan telah
                membaca, memahami, dan menyetujui seluruh ketentuan yang
                berlaku. Jika Anda tidak menyetujui bagian dari ketentuan ini,
                mohon untuk tidak menggunakan layanan {title}.
              </p>

              <h3 className="font-semibold text-gray-900">1. Ketentuan Umum</h3>
              <p>
                {title} adalah platform perdagangan online yang menyediakan
                berbagai jenis produk dari berbagai kategori. Pengguna setuju
                untuk tidak menggunakan layanan kami untuk tujuan ilegal,
                merusak, atau melanggar hukum yang berlaku. Semua aktivitas yang
                dilakukan melalui akun pengguna merupakan tanggung jawab
                masing-masing pengguna.
              </p>

              <h3 className="font-semibold text-gray-900">
                2. Kelayakan & Batas Usia Pengguna
              </h3>
              <p>
                Layanan {title} hanya boleh digunakan oleh individu berusia
                minimal 18 tahun atau telah dianggap dewasa berdasarkan hukum
                yang berlaku. Jika Anda berusia di bawah 18 tahun, Anda harus
                menggunakan layanan di bawah pengawasan orang tua atau wali yang
                sah.
              </p>

              <h3 className="font-semibold text-gray-900">
                3. Pendaftaran Akun
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Pengguna wajib memberikan informasi yang benar, valid, dan
                  terbaru.
                </li>
                <li>
                  Pengguna bertanggung jawab penuh terhadap kerahasiaan akun dan
                  password.
                </li>
                <li>
                  Segala aktivitas yang terjadi melalui akun pengguna dianggap
                  sebagai aktivitas pengguna sendiri.
                </li>
                <li>
                  {title} berhak menonaktifkan akun yang melanggar ketentuan
                  atau dicurigai melakukan penyalahgunaan.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">
                4. Informasi Produk & Harga
              </h3>
              <p>
                {title} berusaha memberikan informasi produk yang akurat dan
                terbaru. Namun demikian, pengguna memahami bahwa:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Gambar produk mungkin berbeda karena pencahayaan atau tampilan
                  layar.
                </li>
                <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
                <li>
                  Ketersediaan stok dapat berubah secara real-time dan tidak
                  selalu mencerminkan keadaan terbaru.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">
                5. Pemesanan & Konfirmasi Transaksi
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Pemesanan dianggap valid setelah pembayaran terverifikasi.
                </li>
                <li>
                  {title} berhak membatalkan pesanan apabila ditemukan kesalahan
                  harga, kesalahan sistem, atau indikasi penipuan.
                </li>
                <li>
                  Apabila pesanan dibatalkan secara sepihak oleh {title}, dana
                  akan dikembalikan 100% kepada pelanggan.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">6. Pembayaran</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Pembayaran hanya dapat dilakukan melalui metode yang tersedia
                  pada website.
                </li>
                <li>
                  Pengguna wajib memastikan nominal pembayaran sesuai dengan
                  instruksi transaksi.
                </li>
                <li>
                  Pembayaran yang tidak sesuai menyebabkan pesanan otomatis
                  gagal.
                </li>
                <li>
                  {title} tidak bertanggung jawab atas kesalahan transfer dana
                  oleh pengguna.
                </li>
                <li>
                  Bukti pembayaran wajib disimpan untuk keperluan verifikasi.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">7. Pengiriman</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Estimasi pengiriman berbeda tergantung lokasi, beban kerja
                  kurir, dan kondisi eksternal.
                </li>
                <li>
                  Risiko kehilangan atau kerusakan barang setelah diserahkan ke
                  kurir menjadi tanggung jawab pihak logistik.
                </li>
                <li>
                  Pengguna wajib memastikan alamat pengiriman benar dan lengkap.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">8. Garansi Produk</h3>
              <p>
                Tidak semua produk memiliki garansi. Pengguna wajib membaca
                informasi garansi pada deskripsi produk sebelum melakukan
                pembelian.
              </p>

              <h3 className="font-semibold text-gray-900">
                9. Pengembalian Barang (Retur) & Refund
              </h3>
              <p>
                Pengembalian barang hanya dapat dilakukan apabila memenuhi
                syarat berikut:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Produk rusak bukan karena kesalahan pengguna.</li>
                <li>Kemasan, label, dan kelengkapan produk masih utuh.</li>
                <li>
                  Pengajuan dilakukan maksimal 3×24 jam setelah barang diterima.
                </li>
                <li>Produk tidak dalam kondisi telah digunakan.</li>
                <li>
                  Wajib menyertakan video bukti unboxing saat membuka paket.
                </li>
              </ul>

              <h3 className="font-semibold text-gray-900">
                10. Hak Kekayaan Intelektual
              </h3>
              <p>
                Seluruh konten pada website ini (teks, desain, logo, gambar, dan
                sistem) dilindungi oleh hukum Hak Kekayaan Intelektual. Pengguna
                dilarang menyalin, mendistribusikan, atau memanfaatkan konten
                tanpa izin tertulis dari {title}.
              </p>

              <h3 className="font-semibold text-gray-900">
                11. Aktivitas yang Dilarang
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Mengunggah konten yang melanggar hukum.</li>
                <li>Mencoba meretas atau mengganggu server {title}.</li>
                <li>Membuat pesanan palsu atau spam transaksi.</li>
                <li>Menyalahgunakan voucher, promo, atau sistem reward.</li>
              </ul>

              <h3 className="font-semibold text-gray-900">
                12. Pembatasan Tanggung Jawab
              </h3>
              <p>
                {title} tidak bertanggung jawab atas kerugian langsung maupun
                tidak langsung yang timbul dari penggunaan situs, termasuk namun
                tidak terbatas pada kehilangan data, keuntungan, atau kerusakan
                akibat penundaan layanan pihak ketiga.
              </p>

              <h3 className="font-semibold text-gray-900">13. Force Majeure</h3>
              <p>
                {title} dibebaskan dari tanggung jawab apabila terjadi kegagalan
                layanan akibat keadaan di luar kendali seperti bencana alam,
                perang, gangguan listrik massal, kebijakan pemerintah, atau
                serangan siber.
              </p>

              <h3 className="font-semibold text-gray-900">
                14. Perubahan Syarat & Ketentuan
              </h3>
              <p>
                {title} berhak mengubah Syarat dan Ketentuan ini tanpa
                pemberitahuan sebelumnya. Pengguna diharapkan memeriksa halaman
                ini secara berkala untuk mengetahui pembaruan terbaru.
              </p>

              <h3 className="font-semibold text-gray-900">
                15. Penyelesaian Sengketa
              </h3>
              <p>
                Setiap perselisihan akan diselesaikan terlebih dahulu melalui
                musyawarah. Jika tidak tercapai kesepakatan, maka sengketa akan
                diselesaikan sesuai hukum yang berlaku di Indonesia.
              </p>

              <h3 className="font-semibold text-gray-900">16. Kontak</h3>
              <p>
                Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini,
                silakan hubungi layanan pelanggan melalui halaman Kontak.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 my-btn-primary rounded-lg transition font-medium"
              >
                Saya Mengerti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TermsModal;
