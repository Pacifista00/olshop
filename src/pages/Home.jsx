import Carousel from "../components/Carousel";
import TopCategory from "../components/TopCategory";
import TopProduct from "../components/BestProduct";
import LatestProduct from "../components/LatestProduct";
import RewardsSection from "../components/RewardsSection";

function Home() {
  return (
    <>
      <div className="pt-40 md:pt-28">
        <Carousel />
      </div>
      <TopProduct />
      <TopCategory />
      <LatestProduct />
      <RewardsSection />
    </>
  );
}

export default Home;
