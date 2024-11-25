import Image from "next/image";
import Link from 'next/link'

export default function HistoricalBackground({ HistoryBgData }) {
  const { title, description, btn, image } = HistoryBgData;
  return (
    <>
      <div className="w-full flex justify-center items-start py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-screen-xl px-4">
          <div className="flex flex-col gap-5 md:gap-10 mb-10">
            <h2 className="text-4xl font-semibold">{title}</h2>
            <p className="bg-green-950 text-white p-10 text-lg">{description}</p>
            <Link href="/about">
              <button className="bg-white text-black font-semibold border border-black py-3 px-4 flex justify-between items-center">
                {btn}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="relative overflow-hidden ">
            {HistoryBgData.src ? (
              <video src={HistoryBgData.src} controls autoPlay muted loop className="w-full object-cover" />
            ) : (
              <p className="text-red-500 font-ibm text-xl">
                Video unavailable!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
