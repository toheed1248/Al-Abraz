import FloatingContactPro from "../components/FloatingContactPro";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import TextSlider from "../components/TextSlider";
import About from "../pages/About";
import Services from "../pages/Services";
import Gallery from "../components/Gallery";
import Question from "../pages/Question";
import Contact from "./Contact";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-black text-white">

        

      <Navbar />

      <section id="home">
        <Slider />
      </section>
        <TextSlider />
        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="questions">
          <Question />
        </section>
        <section id="contact">
          <Contact />
        </section>
      <Footer />
     <FloatingContactPro />
    </div>
  );
};

export default Home; 