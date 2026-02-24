import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";
import About from "@/components/About";
import Brand from "@/components/Brand";


export default function HomePage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <About />
      <Brand />
      <NewsLetter />
      <Footer />
      <ScrollUp />
      <SocialFloating />
    </>
  );
}
