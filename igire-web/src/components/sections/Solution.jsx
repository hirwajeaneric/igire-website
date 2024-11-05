

const Solution = ({ SolutionSectionData }) => {
  const { description, btn1, btn2 } = SolutionSectionData;
  return (
    <>
      <div className="bg-black flex justify-center">
      <div className="py-[4rem] px-[10rem] max-w-[89rem] text-center flex flex-col gap-5 font-ibm">
        <div>
          <p className="text-white font-ibm text-xl">{description}</p>
        </div>
        <div>
          <button className="bg-white border p-3 mr-5">{btn1}</button>
          <button className="text-white border p-3">{btn2}</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Solution;
