import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40">
        <h2 className="text-3xl font-bold mb-6">Syarat & Ketentuan</h2>

        <p className="text-gray-700 leading-relaxed mb-8">
          Syarat dan Ketentuan ini mengatur penggunaan layanan pada
          <strong> TokoKu</strong>. Dengan mengakses, menggunakan, atau
          melakukan transaksi di website kami, Anda menyatakan telah membaca,
          memahami, dan menyetujui seluruh ketentuan yang berlaku. Jika Anda
          tidak menyetujui bagian dari ketentuan ini, mohon untuk tidak
          menggunakan layanan TokoKu.
        </p>

        {/* 1. Ketentuan Umum */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">1. Ketentuan Umum</h2>
          <p className="text-gray-700 leading-relaxed">
            TokoKu adalah platform perdagangan online yang menyediakan berbagai
            jenis produk dari berbagai kategori. Pengguna setuju untuk tidak
            menggunakan layanan kami untuk tujuan ilegal, merusak, atau
            melanggar hukum yang berlaku. Semua aktivitas yang dilakukan melalui
            akun pengguna merupakan tanggung jawab masing-masing pengguna.
          </p>
        </div>

        {/* 2. Kelayakan dan Umur Pengguna */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            2. Kelayakan & Batas Usia Pengguna
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Layanan TokoKu hanya boleh digunakan oleh individu berusia minimal
            18 tahun atau telah dianggap dewasa berdasarkan hukum yang berlaku.
            Jika Anda berusia di bawah 18 tahun, Anda harus menggunakan layanan
            di bawah pengawasan orang tua atau wali yang sah.
          </p>
        </div>

        {/* 3. Pendaftaran Akun */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">3. Pendaftaran Akun</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
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
              TokoKu berhak menonaktifkan akun yang melanggar ketentuan atau
              dicurigai melakukan penyalahgunaan.
            </li>
          </ul>
        </div>

        {/* 4. Informasi Produk & Harga */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            4. Informasi Produk & Harga
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            TokoKu berusaha memberikan informasi produk yang akurat dan terbaru.
            Namun demikian, pengguna memahami bahwa:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              Gambar produk mungkin berbeda karena pencahayaan atau tampilan
              layar.
            </li>
            <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
            <li>
              Ketersediaan stok dapat berubah secara real-time dan tidak selalu
              mencerminkan keadaan terbaru.
            </li>
          </ul>
        </div>

        {/* 5. Pemesanan & Transaksi */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            5. Pemesanan & Konfirmasi Transaksi
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Pemesanan dianggap valid setelah pembayaran terverifikasi.</li>
            <li>
              TokoKu berhak membatalkan pesanan apabila ditemukan kesalahan
              harga, kesalahan sistem, atau indikasi penipuan.
            </li>
            <li>
              Apabila pesanan dibatalkan oleh TokoKu, dana akan dikembalikan
              100% ke metode pembayaran sesuai kebijakan refund.
            </li>
          </ul>
        </div>

        {/* 6. Pembayaran */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">6. Pembayaran</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Pembayaran hanya dapat dilakukan melalui metode yang tersedia pada
            website. Pengguna wajib memastikan nominal pembayaran sesuai dengan
            instruksi transaksi.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              Pembayaran yang tidak sesuai menyebabkan pesanan otomatis gagal.
            </li>
            <li>
              TokoKu tidak bertanggung jawab atas kesalahan transfer dana.
            </li>
            <li>Bukti pembayaran wajib disimpan untuk keperluan verifikasi.</li>
          </ul>
        </div>

        {/* 7. Pengiriman */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">7. Pengiriman</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              Estimasi pengiriman berbeda tergantung lokasi, beban kerja kurir,
              dan kondisi eksternal.
            </li>
            <li>
              Risiko kehilangan atau kerusakan barang setelah diserahkan ke
              kurir menjadi tanggung jawab pihak logistik.
            </li>
            <li>
              Pengguna wajib memastikan alamat pengiriman benar dan lengkap.
            </li>
          </ul>
        </div>

        {/* 8. Garansi Produk */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">8. Garansi Produk</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Garansi produk mengikuti kebijakan masing-masing produsen atau
            seller. Tidak semua produk memiliki garansi. Pengguna wajib membaca
            informasi garansi sebelum melakukan pembelian.
          </p>
        </div>

        {/* 9. Pengembalian & Refund */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            9. Pengembalian Barang (Retur) & Refund
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Pengembalian barang hanya dapat dilakukan apabila memenuhi syarat:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Produk rusak bukan karena kesalahan pengguna.</li>
            <li>Kemasan, label, dan kelengkapan masih utuh.</li>
            <li>
              Pengajuan dilakukan maksimal 3×24 jam setelah barang diterima.
            </li>
            <li>Produk tidak boleh dalam kondisi digunakan.</li>
          </ul>
        </div>

        {/* 10. Hak Kekayaan Intelektual */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            10. Hak Kekayaan Intelektual
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Seluruh konten pada website ini seperti teks, desain, logo, ikon,
            gambar, struktur, dan perangkat lunak dilindungi oleh hukum Hak
            Kekayaan Intelektual. Pengguna dilarang menyalin, mendistribusikan,
            atau memanfaatkan konten tanpa izin tertulis dari TokoKu.
          </p>
        </div>

        {/* 11. Larangan & Aktivitas Terlarang */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            11. Aktivitas yang Dilarang
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Mengunggah konten yang melanggar hukum.</li>
            <li>Mencoba meretas atau mengganggu server TokoKu.</li>
            <li>Membuat pesanan palsu atau spam transaksi.</li>
            <li>Menyalahgunakan voucher, promo, atau sistem reward.</li>
          </ul>
        </div>

        {/* 12. Pembatasan Tanggung Jawab */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            12. Pembatasan Tanggung Jawab
          </h2>
          <p className="text-gray-700 leading-relaxed">
            TokoKu tidak bertanggung jawab atas kerugian langsung, tidak
            langsung, insidental, atau konsekuensial yang timbul dari penggunaan
            situs, termasuk namun tidak terbatas pada kehilangan data,
            keuntungan, atau kerusakan akibat penundaan layanan pihak ketiga.
          </p>
        </div>

        {/* 13. Force Majeure */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">13. Force Majeure</h2>
          <p className="text-gray-700 leading-relaxed">
            TokoKu dibebaskan dari tanggung jawab apabila terjadi kegagalan
            layanan akibat keadaan di luar kendali seperti bencana alam, perang,
            gangguan listrik, kebijakan pemerintah, atau serangan siber.
          </p>
        </div>

        {/* 14. Perubahan Syarat & Ketentuan */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            14. Perubahan Syarat & Ketentuan
          </h2>
          <p className="text-gray-700 leading-relaxed">
            TokoKu berhak mengubah Syarat dan Ketentuan tanpa pemberitahuan
            sebelumnya. Pengguna diharapkan memeriksa halaman ini secara berkala
            untuk mengetahui pembaruan terbaru.
          </p>
        </div>

        {/* 15. Penyelesaian Sengketa */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            15. Penyelesaian Sengketa
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Setiap perselisihan akan diselesaikan terlebih dahulu melalui
            musyawarah. Jika tidak tercapai kesepakatan, maka sengketa akan
            diselesaikan sesuai hukum yang berlaku di Indonesia.
          </p>
        </div>

        {/* 16. Kontak */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">16. Kontak</h2>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini,
            silakan hubungi layanan pelanggan melalui halaman{" "}
            <strong>Kontak</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
