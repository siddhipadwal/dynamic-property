import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import HeroSlider from "@/components/HeroSlider";
import Connect from "@/components/Connect";
import BestChoices from "@/components/BestChoices";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProperties from "@/components/FeaturedProperties";
import VideoSection from "@/components/VideoSection";
import Cities from "@/components/Cities";
// import Testimonial from "@/components/Testimonial";
import TeamSection from "@/components/TeamSection";
import Brand from "@/components/Brand";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";


export default function HomePage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <HeroSlider />
      <Connect />
      <BestChoices />
      <WhyChooseUs />
      <FeaturedProperties />
      <VideoSection />
      <Cities />
      {/* <Testimonial /> */}
      <Brand />
      <TeamSection />
      <NewsLetter />
      <Footer />
      <ScrollUp />
      <SocialFloating />
    </>
  );
}
