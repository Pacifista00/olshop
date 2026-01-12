import React from "react";

import PageMeta from "../../components/Admin/common/PageMeta";
import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import CategoryProductAdd from "../../components/Admin/form/CategoryProductAdd";

export default function CategoryProductAddPage() {
  return (
    <div>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${
          import.meta.env.VITE_APP_NAME
        } untuk mengelola produk, kategori, voucher, pesanan, dan laporan penjualan secara terpusat.`}
      />

      <PageBreadcrumb pageTitle="Tambah Kategori Produk" />

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <CategoryProductAdd />
        </div>
      </div>
    </div>
  );
}
