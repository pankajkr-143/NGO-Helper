import About from "./Components/AboutSection/About";
import Achievement from "./Components/AchievementSection/Achievement";
import Banner from "./Components/BannerSection/Banner";
import Feature from "./Components/FeatureSection/Feature";
import Footer from "./Components/FooterSection/Footer";
import Header from "./Components/HeaderSection/Header";
import Mission from "./Components/MissionSection/Mission";
import Modal from "./Components/ModalSection/Modal";
import Socialwork from "./Components/SocialworkSection/Socialwork";
import Teamsection from "./Components/TeamSection/Teamsection";
import Testimonial from "./Components/TestimonialSection/Testimonial";

const App = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <About/>
      <Mission/>
      <Socialwork/>
      <Achievement/>
      <Teamsection/>
      <Feature/>
      <Testimonial/>
      <Footer/>
      <Modal/>
    </div>
  )
}

export default App;