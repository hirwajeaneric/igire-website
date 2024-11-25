import Link from "next/link";

const Solution = ({ SolutionSectionData }) => {
  const { description, btn1, btn2 } = SolutionSectionData;
  return (
    <div className="text-black flex justify-center py-20">
      <div className="py-10 px-6 sm:px-10 md:px-20 lg:px-40 max-w-[89rem] text-center flex flex-col gap-5 font-ibm">
        <div>
          <p className="text-base sm:text-lg md:text-xl">{description}</p>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
          <Link href="/" className="bg-white text-black font-semibold border border-black py-3 px-4 sm:mr-5 w-full sm:w-auto">
            {btn1}
          </Link>
          <Link href={'/about/#team'} className="font-semibold border py-3 px-4 w-full sm:w-auto bg-black text-white">
            {btn2}
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Solution;
