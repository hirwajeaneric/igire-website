import React from "react";

const CallForAction = ({ CallForActionData }) => {
  const { title, description, btn } = CallForActionData;
  return (
    <>
      <div className="border border-black py-5 px-10 max-w-[50%] text-center flex flex-col gap-5 font-ibm">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div>
          <p className="font-ibm text-xl">{description}</p>
        </div>
        <div>
          <button className="bg-black text-white p-3 mr-5">{btn}</button>
        </div>
      </div>
    </>
  );
};

export default CallForAction;
