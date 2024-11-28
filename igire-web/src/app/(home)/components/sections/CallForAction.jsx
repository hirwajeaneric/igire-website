import Link from "next/link";
import React from "react";

const CallForAction = ({ CallForActionData }) => {
  const { title, description, btn } = CallForActionData;
  return (
    <div className="md:flex md:justify-center py-12 md:py-24 px-4 bg-orange-500">
      <div className="w-full text-center flex flex-col justify-center items-center gap-5 md:gap-10 font-ibm">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="font-ibm text-lg w-full md:w-2/3">{description}</p>
        <Link href="/contact" className="border-2 border-black text-black font-bold text-lg hover:bg-black hover:text-white px-4 py-2">Contact Us</Link>
      </div>
    </div>
  );
};

export default CallForAction;
