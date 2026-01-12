import EcommerceMetrics from "../../components/Admin/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/Admin/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/Admin/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/Admin/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/Admin/ecommerce/RecentOrders";
import DemographicCard from "../../components/Admin/ecommerce/DemographicCard";
import PageMeta from "../../components/Admin/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title={`${import.meta.env.VITE_APP_NAME} Dashboard`}
        description={`Dashboard admin ${
          import.meta.env.VITE_APP_NAME
        } untuk mengelola produk, kategori, voucher, pesanan, dan laporan penjualan secara terpusat.`}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
