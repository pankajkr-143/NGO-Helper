import About from "./Components/AboutSection/About";
import Achievement from "./Components/AchievementSection/Achievement";
import Banner from "./Components/BannerSection/Banner";
import Feature from "./Components/FeatureSection/Feature";
import Footer from "./Components/FooterSection/Footer";
import Header from "./Components/HeaderSection/Header";
import PaymentHistory from "./Components/HeaderSection/PaymentHistory";
import Mission from "./Components/MissionSection/Mission";
import Socialwork from "./Components/SocialworkSection/Socialwork";
import Teamsection from "./Components/TeamSection/Teamsection";
import Testimonial from "./Components/TestimonialSection/Testimonial";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import {Logout} from "./logout";
import { AuthProvider } from "./store/auth";
import Blog from "./Components/BlogSection/Blog";
import Gallery from "./Components/GallerySection/Gallery";
import ContactUs from "./Components/ContactSection/ContactUs";
import UpcomingEvents from "./Components/EventSection/UpcomingEvents";
import VolunteerForm from "./Components/EventSection/volunteerForm";



const App = () => {
  return (
    <div className="h-full overflow-y-auto"> 
    {/* Ensure that this div allows scrolling */}
      <Router>
        {/* Header is included in all pages */}
        <AuthProvider>
          <Header />
        </AuthProvider>

        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <About />
                <Mission />
                <UpcomingEvents/>
                <Socialwork />
                <Achievement />
                <Blog/>
                <Teamsection />
                <Feature />
                <Testimonial />
                <Footer />
            
              </>
            }
          />

          {/* Login and Signup routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />}/>
          {/* Gallery Route */}
          <Route path="/Gallery" element={<Gallery />}/>
          <Route path="/aboutus" element={<About />}/>
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/paymentHistory" element={<PaymentHistory />}/>
          <Route path="/volunteer" element={<VolunteerForm />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
