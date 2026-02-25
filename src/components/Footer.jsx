import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiFacebook, mdiInstagram, mdiYoutube, mdiMusicNote } from "@mdi/js";

export default function Footer() {
  return (
    <footer className="bg-white pt-12 pb-6 mt-6 border-t border-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
          {/* Brand */}
          <div>
            <img
              src="/image/logo/logofull.png" // sesuaikan path logo kamu
              alt="Logo"
              className="h-8 mb-3"
            />
            <p className="text-sm leading-relaxed">
              Platform belanja terpercaya dengan produk berkualitas dan
              pelayanan terbaik.
            </p>

            <div className="flex gap-4 mt-4">
              <Link to="/" className="hover:text-black text-sm">
                <Icon path={mdiFacebook} size={0.9} />
              </Link>
              <Link to="/" className="hover:text-black text-sm">
                <Icon path={mdiInstagram} size={0.9} />
              </Link>
              <Link to="/" className="hover:text-black text-sm">
                <Icon path={mdiYoutube} size={0.9} />
              </Link>
              <Link to="/" className="hover:text-black text-sm">
                <Icon path={mdiMusicNote} size={0.9} />
              </Link>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-black">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-black">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/kategori" className="hover:text-black">
                  Kategori
                </Link>
              </li>
              {/* <li>
                <Link to="/promo" className="hover:text-black">
                  Promo
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tentang-kami" className="hover:text-black">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/cara-belanja" className="hover:text-black">
                  Cara Belanja
                </Link>
              </li>
              <li>
                <Link to="/syarat-dan-ketentuan" className="hover:text-black">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Berlangganan</h3>
            <p className="text-sm mb-3">
              Dapatkan poin setiap pembelian dan tukarkan untuk potongan harga
              atau promo menarik.
            </p>

            <div className="flex items-center">
              <Link
                to="/produk"
                className="px-4 py-2 my-btn-primary text-white rounded-lg w-full text-center block"
              >
                Mulai Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* HR full width */}
      <hr className="w-full border-gray-300 my-8" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TokoKu. Semua Hak Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
