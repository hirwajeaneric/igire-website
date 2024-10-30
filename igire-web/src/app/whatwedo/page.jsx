// components/WhatWeDo.js

import Slideshow from '../../components/Slideshow'; // Import the Slideshow component
import Slideshow2 from '../../components/Slideshow2';
export default function WhatWeDo() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">What We Do</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Igire Rwanda Organization is dedicated to empowering young girls and women,
          providing them with the skills, resources, and support they need to thrive.
          Through education, mentorship, and hands-on training programs,
          Igire Rwanda helps these women unlock their potential, fostering their confidence and capabilities
          to lead in their communities. By offering opportunities in areas like entrepreneurship, technology,
          and leadership, the organization accelerates their journey toward economic independence and personal growth.
          At Igire Rwanda, we believe that empowered women are key to building a brighter, more inclusive future for all.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-8">
        <div className="md:flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            SheCanCODE Bootcamp
          </h3>
          <p className="mt-4 text-gray-600">
          In SheCanCODE, we train you from ground up and train you to think, work and approach problems as a software developer. Since 2016, SheCanCODE has delivered more than 800 women to the Job market in Tech related fields          
          </p>
          <button className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Visit Website
          </button>
        </div>

        <div className="md:flex-1 mt-6 md:mt-0">
          <Slideshow /> {/* Updated to use the Slideshow component */}
        </div>

       
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-8 mt-28">
        <div className="md:flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            Away ( Academy for Women Entrepreneurs / Rwanda )
          </h3>
          <p className="mt-4 text-gray-600">
          We empower girls and women to solve community problems through entrepreneurial trainings.
          </p>
          <button className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Visit Website
          </button>
        </div>

        <div className="md:flex-1 mt-6 md:mt-0">
          <Slideshow2 /> {/* Updated to use the Slideshow component */}
        </div>

       
      </div>
    </section>
  );
}
