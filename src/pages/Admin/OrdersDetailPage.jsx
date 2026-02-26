import PageBreadcrumb from "../../components/Admin/common/PageBreadCrumb";
import ComponentCard from "../../components/Admin/common/ComponentCard";
import PageMeta from "../../components/Admin/common/PageMeta";
import OrderDetail from "../../components/Admin/Order/OrderDetail";

export default function OrdersDetailPage() {
  return (
    <>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description="Detail pesanan"
      />

      <PageBreadcrumb pageTitle="Detail Order" />
      <div className="space-y-6">
        <ComponentCard title="Detail Pesanan">
          <OrderDetail />
        </ComponentCard>
      </div>
    </>
  );
}
