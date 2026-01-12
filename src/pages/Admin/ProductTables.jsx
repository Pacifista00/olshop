import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../components/Admin/common/ComponentCard";
import PageMeta from "../../components/Admin/common/PageMeta";
import BasicTableOne from "../../components/Admin/BasicTables/ProductList";

export default function ProductTables() {
  return (
    <>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${
          import.meta.env.VITE_APP_NAME
        } untuk mengelola produk, kategori, voucher, pesanan, dan laporan penjualan secara terpusat.`}
      />

      <PageBreadcrumb pageTitle="Produk" />
      <div className="space-y-6">
        <ComponentCard title="Data Produk">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
