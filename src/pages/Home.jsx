import Carousel from "../components/Carousel";
import LatestProduct from "../components/LatestProduct";
import Navbar from "../components/Navbar";
import TopCategory from "../components/TopCategory";
import MostProduct from "../components/MostProduct";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-40 md:pt-28">
        <Carousel />
      </div>
      <LatestProduct />
      <TopCategory />
      <MostProduct />
      <Footer />
    </>
  );
}

export default Home;
