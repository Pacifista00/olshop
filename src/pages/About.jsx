import React from "react";
import {
  mdiStore,
  mdiTruckFast,
  mdiShieldCheck,
  mdiAccountGroup,
  mdiBullhorn,
  mdiShoppingOutline,
  mdiCurrencyUsd,
  mdiEmail,
  mdiPhone,
  mdiMapMarker,
} from "@mdi/js";
import Icon from "@mdi/react";
import SubHeadingCenter from "../components/SubHeadingCenter";
import SubHeading from "../components/SubHeading";

export default function About() {
  return (
    <div className="text-gray-800">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-2 pb-10 text-center pt-44 md:pt-40">
        <SubHeadingCenter className="text-gray-800">
          Tentang Kami
        </SubHeadingCenter>

        <p className="max-w-2xl mx-auto text-gray-600 text-md lg:text-lg">
          Kami adalah platform online shop modern yang berfokus pada kualitas,
          kecepatan pengiriman, dan pengalaman belanja terbaik untuk pelanggan.
        </p>
      </section>

      {/* Visi Misi */}
      <section className="max-w-7xl mx-auto px-6 py-2 pb-10 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-8 rounded-2xl shadow">
          <SubHeading className="text-gray-800">Visi Kami</SubHeading>
          <p className="text-gray-600 leading-relaxed text-xs lg:text-sm">
            Menjadi platform e-commerce terpercaya yang membantu pelanggan
            menemukan produk terbaik dengan harga terjangkau dan layanan cepat.
          </p>
        </div>

        <div className="bg-white p-4 lg:p-8 rounded-2xl shadow">
          <SubHeading className="text-gray-800">Misi Kami</SubHeading>
          <ul className="text-gray-600 space-y-2 list-disc pl-5 text-xs lg:text-sm">
            <li className="list-item">
              Menyediakan produk berkualitas tinggi.
            </li>
            <li className="list-item">
              Memberikan pengalaman belanja online yang mudah dan aman.
            </li>
            <li className="list-item">
              Menghadirkan pengiriman cepat dan dapat diandalkan.
            </li>
            <li className="list-item">Menawarkan harga yang kompetitif.</li>
          </ul>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="max-w-7xl mx-auto px-6 py-4 pb-10">
        <SubHeadingCenter className="text-gray-800">
          Mengapa Memilih Kami?
        </SubHeadingCenter>
        <div className="w-full grid md:grid-cols-3 gap-4">
          <div className="p-4 lg:p-8 bg-gray-100 rounded-2xl shadow text-center">
            <Icon path={mdiTruckFast} size={2} className="mx-auto mb-4" />
            <h3 className="font-semibold text-md lg:text-lg mb-2">
              Pengiriman Cepat
            </h3>
            <p className="text-gray-600 text-xs lg:text-sm">
              Kami bekerja sama dengan ekspedisi terbaik untuk memastikan barang
              sampai tepat waktu.
            </p>
          </div>

          <div className="p-4 lg:p-8 bg-gray-100 rounded-2xl shadow text-center">
            <Icon path={mdiShieldCheck} size={2} className="mx-auto mb-4" />
            <h3 className="font-semibold text-md lg:text-lg mb-2">
              Transaksi Aman
            </h3>
            <p className="text-gray-600 text-xs lg:text-sm">
              Pembayaran dijamin aman dengan sistem enkripsi modern.
            </p>
          </div>

          <div className="p-4 lg:p-8 bg-gray-100 rounded-2xl shadow text-center">
            <Icon path={mdiStore} size={2} className="mx-auto mb-4" />
            <h3 className="font-semibold text-md lg:text-lg mb-2">
              Produk Terpercaya
            </h3>
            <p className="text-gray-600 text-xs lg:text-sm">
              Kami hanya bekerja dengan supplier yang sudah terverifikasi.
            </p>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section className="max-w-7xl mx-auto px-6 py-4 pb-10">
        <SubHeadingCenter className="text-gray-800">Kontak</SubHeadingCenter>
        <div className="grid md:grid-cols-3 gap-4 text-gray-700">
          <div className="bg-white p-4 lg:p-8 rounded-2xl shadow flex items-start gap-4">
            <Icon path={mdiEmail} size={1.4} />
            <div className="text-xs lg:text-sm">
              <h3 className="font-bold text-md lg:text-lg">Email</h3>
              <p>support@onlineshop.com</p>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-8 rounded-2xl shadow flex items-start gap-4">
            <Icon path={mdiPhone} size={1.4} />
            <div className="text-xs lg:text-sm">
              <h3 className="font-bold text-md lg:text-lg">Telepon</h3>
              <p>+62 812-3456-7890</p>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-8 rounded-2xl shadow flex items-start gap-4">
            <Icon path={mdiMapMarker} size={1.4} />
            <div className="text-xs lg:text-sm">
              <h3 className="font-bold text-md lg:text-lg">Lokasi</h3>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
