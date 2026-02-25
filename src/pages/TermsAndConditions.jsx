import SubHeading from "../components/SubHeading";
import SubHeading2 from "../components/SubHeading2";

export default function TermsAndConditions() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40">
        <SubHeading className="mb-4">Produk Terbaru</SubHeading>

        <p className="leading-relaxed mb-8 text-xs lg:text-sm">
          Syarat dan Ketentuan ini mengatur penggunaan layanan pada
          <strong> TokoKu</strong>. Dengan mengakses, menggunakan, atau
          melakukan transaksi di website kami, Anda menyatakan telah membaca,
          memahami, dan menyetujui seluruh ketentuan yang berlaku. Jika Anda
          tidak menyetujui bagian dari ketentuan ini, mohon untuk tidak
          menggunakan layanan TokoKu.
        </p>

        {/* 1. Ketentuan Umum */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">1. Ketentuan Umum</SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            TokoKu adalah platform perdagangan online yang menyediakan berbagai
            jenis produk dari berbagai kategori. Pengguna setuju untuk tidak
            menggunakan layanan kami untuk tujuan ilegal, merusak, atau
            melanggar hukum yang berlaku. Semua aktivitas yang dilakukan melalui
            akun pengguna merupakan tanggung jawab masing-masing pengguna.
          </p>
        </div>

        {/* 2. Kelayakan dan Umur Pengguna */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            2. Kelayakan & Batas Usia Pengguna
          </SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            Layanan TokoKu hanya boleh digunakan oleh individu berusia minimal
            18 tahun atau telah dianggap dewasa berdasarkan hukum yang berlaku.
            Jika Anda berusia di bawah 18 tahun, Anda harus menggunakan layanan
            di bawah pengawasan orang tua atau wali yang sah.
          </p>
        </div>

        {/* 3. Pendaftaran Akun */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">3. Pendaftaran Akun</SubHeading2>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
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
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            4. Informasi Produk & Harga
          </SubHeading2>
          <p className="leading-relaxed mb-3 text-xs lg:text-sm">
            TokoKu berusaha memberikan informasi produk yang akurat dan terbaru.
            Namun demikian, pengguna memahami bahwa:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
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
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            5. Pemesanan & Konfirmasi Transaksi
          </SubHeading2>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
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
        <div className="mb-5">
          <SubHeading2 className="mb-2">6. Pembayaran</SubHeading2>
          <p className="leading-relaxed mb-3 text-xs lg:text-sm">
            Pembayaran hanya dapat dilakukan melalui metode yang tersedia pada
            website. Pengguna wajib memastikan nominal pembayaran sesuai dengan
            instruksi transaksi.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
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
        <div className="mb-5">
          <SubHeading2 className="mb-2">7. Pengiriman</SubHeading2>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
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
        <div className="mb-5">
          <SubHeading2 className="mb-2">8. Garansi Produk</SubHeading2>
          <p className="leading-relaxed mb-3 text-xs lg:text-sm">
            Garansi produk mengikuti kebijakan masing-masing produsen atau
            seller. Tidak semua produk memiliki garansi. Pengguna wajib membaca
            informasi garansi sebelum melakukan pembelian.
          </p>
        </div>

        {/* 9. Pengembalian & Refund */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            9. Pengembalian Barang (Retur) & Refund
          </SubHeading2>
          <p className="leading-relaxed mb-3 text-xs lg:text-sm">
            Pengembalian barang hanya dapat dilakukan apabila memenuhi syarat:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
            <li>Produk rusak bukan karena kesalahan pengguna.</li>
            <li>Kemasan, label, dan kelengkapan masih utuh.</li>
            <li>
              Pengajuan dilakukan maksimal 3×24 jam setelah barang diterima.
            </li>
            <li>Produk tidak boleh dalam kondisi digunakan.</li>
          </ul>
        </div>

        {/* 10. Hak Kekayaan Intelektual */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            10. Hak Kekayaan Intelektual
          </SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            Seluruh konten pada website ini seperti teks, desain, logo, ikon,
            gambar, struktur, dan perangkat lunak dilindungi oleh hukum Hak
            Kekayaan Intelektual. Pengguna dilarang menyalin, mendistribusikan,
            atau memanfaatkan konten tanpa izin tertulis dari TokoKu.
          </p>
        </div>

        {/* 11. Larangan & Aktivitas Terlarang */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            11. Aktivitas yang Dilarang
          </SubHeading2>
          <ul className="list-disc pl-5 space-y-2 text-xs lg:text-sm">
            <li>Mengunggah konten yang melanggar hukum.</li>
            <li>Mencoba meretas atau mengganggu server TokoKu.</li>
            <li>Membuat pesanan palsu atau spam transaksi.</li>
            <li>Menyalahgunakan voucher, promo, atau sistem reward.</li>
          </ul>
        </div>

        {/* 12. Pembatasan Tanggung Jawab */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            12. Pembatasan Tanggung Jawab
          </SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            TokoKu tidak bertanggung jawab atas kerugian langsung, tidak
            langsung, insidental, atau konsekuensial yang timbul dari penggunaan
            situs, termasuk namun tidak terbatas pada kehilangan data,
            keuntungan, atau kerusakan akibat penundaan layanan pihak ketiga.
          </p>
        </div>

        {/* 13. Force Majeure */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">13. Force Majeure</SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            TokoKu dibebaskan dari tanggung jawab apabila terjadi kegagalan
            layanan akibat keadaan di luar kendali seperti bencana alam, perang,
            gangguan listrik, kebijakan pemerintah, atau serangan siber.
          </p>
        </div>

        {/* 14. Perubahan Syarat & Ketentuan */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">
            14. Perubahan Syarat & Ketentuan
          </SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            TokoKu berhak mengubah Syarat dan Ketentuan tanpa pemberitahuan
            sebelumnya. Pengguna diharapkan memeriksa halaman ini secara berkala
            untuk mengetahui pembaruan terbaru.
          </p>
        </div>

        {/* 15. Penyelesaian Sengketa */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">15. Penyelesaian Sengketa</SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            Setiap perselisihan akan diselesaikan terlebih dahulu melalui
            musyawarah. Jika tidak tercapai kesepakatan, maka sengketa akan
            diselesaikan sesuai hukum yang berlaku di Indonesia.
          </p>
        </div>

        {/* 16. Kontak */}
        <div className="mb-5">
          <SubHeading2 className="mb-2">16. Kontak</SubHeading2>
          <p className="leading-relaxed text-xs lg:text-sm">
            Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini,
            silakan hubungi layanan pelanggan melalui halaman{" "}
            <strong>Kontak</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
