import CallForAction from '@/components/sections/CallForAction';
import HeroSection from '@/components/sections/heroSection';
import Impact from '@/components/sections/impact';
import Navbar from '@/components/sections/navBar';
import Partners from '@/components/sections/Partners';
import Solution from '@/components/sections/Solution'
import HomePageData from "@/fakeDatas/HomePageFakes"

export default function Home() {
  return (
    <>
      <div>
       <Navbar></Navbar>
       <HeroSection></HeroSection>
       <Impact></Impact>
      </div>
    </>
  );
}
