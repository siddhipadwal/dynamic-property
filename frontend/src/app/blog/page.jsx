import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";
import Blog from "@/components/Blog";


export default function BlogPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <Blog />
      <Footer />
      <ScrollUp />
      <SocialFloating />
    </>
  );
}
