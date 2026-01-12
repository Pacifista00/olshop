import React from "react";

import PageMeta from "../../components/Admin/common/PageMeta";
import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import ProductAdd from "../../components/Admin/form/ProductAdd";

export default function ProductAddPage() {
  return (
    <div>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${
          import.meta.env.VITE_APP_NAME
        } untuk mengelola produk, kategori, voucher, pesanan, dan laporan penjualan secara terpusat.`}
      />

      <PageBreadcrumb pageTitle="Tambah Produk" />

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <ProductAdd />
        </div>
      </div>
    </div>
  );
}
