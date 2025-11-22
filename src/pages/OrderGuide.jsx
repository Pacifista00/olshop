import Icon from "@mdi/react";
import {
  mdiCartOutline,
  mdiAccountCircleOutline,
  mdiCreditCardOutline,
  mdiTruckOutline,
  mdiCheckBold,
  mdiBank,
  mdiQrcodeScan,
  mdiWalletOutline,
} from "@mdi/js";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function OrderGuide() {
  const steps = [
    {
      icon: mdiAccountCircleOutline,
      title: "1. Buat / Masuk Akun",
      desc: "Untuk melakukan pemesanan, Anda harus membuat akun terlebih dahulu atau login menggunakan email/Google.",
    },
    {
      icon: mdiCartOutline,
      title: "2. Pilih Produk",
      desc: "Telusuri produk, baca detailnya, lalu klik tombol “Tambah ke Keranjang” untuk memasukkan produk ke daftar belanja Anda.",
    },
    {
      icon: mdiCartOutline,
      title: "3. Buka Keranjang & Periksa Pesanan",
      desc: "Pastikan produk, jumlah, dan harga sudah sesuai. Anda dapat menghapus atau mengubah kuantitas sebelum checkout.",
    },
    {
      icon: mdiCreditCardOutline,
      title: "4. Lanjut ke Checkout",
      desc: "Isi alamat lengkap, nomor telepon, dan pilih metode pengiriman yang Anda inginkan.",
    },
    {
      icon: mdiCreditCardOutline,
      title: "5. Pilih Metode Pembayaran (Midtrans)",
      desc: "Anda akan diarahkan ke halaman pembayaran Midtrans yang aman untuk menyelesaikan transaksi.",
    },
    {
      icon: mdiCheckBold,
      title: "6. Pembayaran Berhasil",
      desc: "Setelah pembayaran berhasil diverifikasi oleh Midtrans, pesanan Anda akan segera diproses.",
    },
    {
      icon: mdiTruckOutline,
      title: "7. Pesanan Dikirim",
      desc: "Barang akan dikirim menggunakan jasa ekspedisi yang tersedia. Anda akan menerima nomor resi untuk melacak pengiriman.",
    },
  ];

  const paymentMethods = [
    {
      icon: mdiBank,
      title: "Virtual Account (VA)",
      detail:
        "Pembayaran melalui bank BCA, BNI, BRI, Mandiri, Permata, dan lainnya. Anda cukup memasukkan kode VA dan membayar melalui ATM, m-banking, atau i-banking.",
    },
    {
      icon: mdiWalletOutline,
      title: "E-Wallet",
      detail:
        "Dukungan pembayaran seperti GoPay, OVO, Dana, LinkAja. Praktis dan cepat, cukup konfirmasi pembayaran melalui aplikasi e-wallet.",
    },
    {
      icon: mdiQrcodeScan,
      title: "QRIS",
      detail:
        "Scan QR menggunakan aplikasi bank atau e-wallet apa pun. Pembayaran langsung terverifikasi otomatis.",
    },
    {
      icon: mdiCreditCardOutline,
      title: "Kartu Kredit / Debit",
      detail:
        "Pembayaran dengan Visa, MasterCard, atau JCB melalui halaman secure payment Midtrans yang terenkripsi.",
    },
  ];

  return (
    <div className="text-gray-800">
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-4 pb-10 pt-44 md:pt-40">
        <h2 className="text-xl lg:text-2xl font-bold text-center mb-4">
          Cara Belanja
        </h2>
        <p className="text-center text-gray-600 mb-10 text-sm">
          Ikuti langkah-langkah berikut untuk melakukan pemesanan dengan mudah
          dan aman di website kami.
        </p>

        {/* Step-by-Step */}
        <div className="space-y-6 mb-14">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 flex gap-4 items-start"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <Icon path={step.icon} size={1} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-md lg:text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Metode Pembayaran Midtrans */}
        <h2 className="text-xl lg:text-2xl font-bold mb-4">
          Metode Pembayaran (Midtrans)
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Kami menggunakan <strong>Midtrans</strong> sebagai penyedia gateway
          pembayaran yang aman, cepat, dan terpercaya. Anda dapat memilih
          berbagai metode pembayaran sesuai kebutuhan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {paymentMethods.map((m, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition"
            >
              <div className="bg-orange-100 p-3 rounded-full">
                <Icon path={m.icon} size={1} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-md lg:text-lg font-bold">{m.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan Tambahan */}
        <h2 className="text-xl lg:text-2xl font-bold mb-4">
          Informasi Penting
        </h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 text-sm rounded-xl">
          <ul className="space-y-2 list-disc **list-outside** px-3">
            <li className="text-gray-700 **pl-6**">
              Pesanan otomatis dibatalkan jika pembayaran tidak dilakukan dalam
              waktu <strong className="font-semibold">1 × 24 jam</strong>.
            </li>
            <li className="text-gray-700 **pl-6**">
              Seluruh pembayaran diproses oleh Midtrans, sehingga{" "}
              <strong className="font-semibold">
                kami tidak menyimpan data kartu kredit Anda
              </strong>
              .
            </li>
            <li className="text-gray-700 **pl-6**">
              Jika pembayaran sudah dilakukan namun status belum berubah, proses
              verifikasi biasanya memerlukan waktu 1–3 menit.
            </li>
            <li className="text-gray-700 **pl-6**">
              Jika mengalami kendala pembayaran, silakan hubungi CS kami melalui
              WhatsApp.
            </li>
          </ul>
        </div>

        {/* Bantuan */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm">
            Masih mengalami kendala? Kami siap membantu.
          </p>
          <a
            href="#"
            className="inline-block mt-3 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition text-sm"
          >
            Hubungi Customer Support
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
