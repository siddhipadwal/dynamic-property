import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";
import Contact from "@/components/Contact";


export default function HomePage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <Contact />
      <Footer />
      <ScrollUp />
      <SocialFloating />
    </>
  );
}
