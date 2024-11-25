import Image from "next/image";
import React from "react";

const Partners = ({ PartnersData }) => {
  const { title, description, companies } = PartnersData;
  return (
    <div className="flex flex-col gap-10 justify-center items-center font-ibm py-12 md:py-24">
      <div className="max-w-screen-xl flex flex-col items-center justify-center gap-5 px-4">
        <h2 className="font-bold text-4xl mb-5 text-center md:text-start">Our Partners</h2>
        <p className="text-xl text-center">
          {description}
        </p>
      </div>
      {/* <div className="flex justify-center items-center flex-wrap max-w-screen-xl"> */}
      <div className="w-full max-w-screen-xl px-4 grid grid-cols-3 gap-10 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {companies &&
          companies.map((logo, index) => (
            <Image
              key={index}
              src={`${logo.src}`}
              alt={logo.alt}
              className="w-fit h-12 mx-auto"
              width={100}
              height={100}
            />
          ))}
      </div>
    </div>
  );
};

export default Partners;
