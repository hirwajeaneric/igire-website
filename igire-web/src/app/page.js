import CallForAction from '@/components/sections/CallForAction';
import HeroSection from '@/components/sections/heroSection';
import Impact from '@/components/sections/impact';
import Navbar from '@/components/sections/navBar';
import Partners from '@/components/sections/Partners';
import Solution from '@/components/sections/Solution'
import HomePageData from "@/fakeDatas/HomePageFakes"
import Whatwedo from './whatwedo/page.jsx'
import Footer from '@/components/Footer.jsx';

export default function Home() {
  return (
    <>
      <div>
       <Navbar/>
       <HeroSection/>
       <Whatwedo />
       <Impact/>
       <Footer/>
      </div>
      
      
      
    </>
  );
}
