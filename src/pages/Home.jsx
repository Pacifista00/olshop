import Carousel from "../components/Carousel";
import LatestProduct from "../components/LatestProduct";
import TopCategory from "../components/TopCategory";
import MostProduct from "../components/MostProduct";

function Home() {
  return (
    <>
      <div className="pt-40 md:pt-28">
        <Carousel />
      </div>
      <LatestProduct />
      <TopCategory />
      <MostProduct />
    </>
  );
}

export default Home;
