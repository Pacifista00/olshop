import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../components/Admin/common/ComponentCard";
import PageMeta from "../../components/Admin/common/PageMeta";
import ProductRedemptionList from "../../components/Admin/BasicTables/ProductsRedemptionList";

export default function ProductRedemptionsTables() {
  return (
    <>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${import.meta.env.VITE_APP_NAME} untuk mengelola pesanan.`}
      />

      <PageBreadcrumb pageTitle="Rewards" />
      <div className="space-y-6">
        <ComponentCard title="Data Rewards">
          <ProductRedemptionList />
        </ComponentCard>
      </div>
    </>
  );
}
