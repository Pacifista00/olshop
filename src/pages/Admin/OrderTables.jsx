import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../components/Admin/common/ComponentCard";
import PageMeta from "../../components/Admin/common/PageMeta";
import OrdersList from "../../components/Admin/BasicTables/OrdersList";

export default function OrdersTables() {
  return (
    <>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${import.meta.env.VITE_APP_NAME} untuk mengelola pesanan.`}
      />

      <PageBreadcrumb pageTitle="Orders" />
      <div className="space-y-6">
        <ComponentCard title="Data Orders">
          <OrdersList />
        </ComponentCard>
      </div>
    </>
  );
}
