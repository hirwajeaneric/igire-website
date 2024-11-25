import { RiArrowRightSLine } from "react-icons/ri";
import { heroData } from "@/fakeDatas/heroData";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const styles = {
        backgroundImage: `url("/scc15.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <section className="flex w-full flex-wrap md:flex-nowrap items-center max-w-screen-xl mx-auto relative">
            <div className="flex flex-col gap-4 bg-orange-500 text-white w-full lg:w-1/2 mr-0 lg:-mr-48 h-fit px-5 py-16 lg:px-10 items-center lg:items-start z-40 ">
                <h1 className="text-5xl text-center lg:text-left font-bold">Empowering Youth towards Economic Sustainability</h1>
                <p className="text-lg text-center lg:text-left">See what we do to empower youth towards economic sustainability</p>
                <Link href={'/programs'} className="bg-white text-orange-500 px-4 py-2 md:px-6 md:py-3 text-nowrap uppercase w-fit text-center font-semibold md:text-left">Our Programs</Link>
            </div>
            <div className="z-30 w-full lg:w-5/6" style={styles}>

            </div>
        </section>
    );
}
