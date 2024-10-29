import React from "react";

const Solution = ({ SolutionSectionData }) => {
  const { description, btn1, btn2 } = SolutionSectionData;
  return (
    <>
      <div className="bg-black py-5 px-10 max-w-[50%] text-center flex flex-col gap-5 font-ibm">
        <div>
          <p className="text-white font-ibm text-xl">{description}</p>
        </div>
        <div>
          <button className="bg-white border p-3 mr-5">{btn1}</button>
          <button className="text-white border p-3">{btn2}</button>
        </div>
      </div>
    </>
  );
};

export default Solution;
