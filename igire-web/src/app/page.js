import CallForAction from "@/components/sections/CallForAction";
import HeroSection from "@/components/sections/HeroSection.jsx";
import Navbar from "@/components/sections/NavBar.jsx";
import Partners from "@/components/sections/Partners";
import Solution from "@/components/sections/Solution";
import HomePageData from "@/fakeDatas/HomePageFakes";
import WhatWeDo from "./whatwedo/page.jsx";
import Footer from "@/components/Footer.jsx";
import ImpactSection from "@/components/sections/Impact.jsx";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <WhatWeDo />
        <ImpactSection ImpactData={HomePageData.ImpactData} />
        <Footer />
      </div>
    </>
  );
}
