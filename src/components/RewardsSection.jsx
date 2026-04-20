import Icon from "@mdi/react";
import { mdiArrowRightThin, mdiGiftOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import SubHeading from "./SubHeading";

export default function RewardsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      {/* Container utama dengan warna background yang sama dengan TopProduct */}
      <div className="my-bg-primary p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Bagian Kiri: Ikon dan Teks */}
        <div className="flex items-center gap-5">
          <div className="bg-white/20 p-4 rounded-full text-white hidden sm:block">
            <Icon path={mdiGiftOutline} size={2} />
          </div>

          <div className="text-center md:text-left">
            <SubHeading className="text-white mb-1">
              Klaim Reward Kamu!
            </SubHeading>
            <p className="text-white/80 text-sm lg:text-base max-w-md">
              Kumpulkan poin dari setiap transaksi dan tukarkan dengan berbagai
              voucher menarik serta produk eksklusif.
            </p>
          </div>
        </div>

        {/* Bagian Kanan: Tombol Navigasi */}
        <div className="w-full md:w-auto">
          <Link
            to="/rewards"
            className="flex items-center justify-center gap-2 bg-white text-[#your-primary-color] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition group w-full md:w-auto"
            style={{ color: "var(--my-primary-color-hex)" }} // Sesuaikan jika ada variabel warna spesifik
          >
            Lihat Semua Rewards
            <span className="transition group-hover:translate-x-1">
              <Icon path={mdiArrowRightThin} size={1} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
