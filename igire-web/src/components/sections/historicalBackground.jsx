export default function HistoricalBackground() {
  return (
    <div className="relative min-h-screen bg-white">
    
      <div className="container mx-auto px-2 py-2">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative mb-8 md:mb-0">
            <div className="bg-black p-8 text-white rounded-tl-lg rounded-bl-lg">
              <h1 className="text-4xl font-bold mb-6">
              Our Background
              </h1>
              <p className="text-lg mb-16">
              Igire Rwanda Organization is dedicated to empowering young girls and women, providing them with the skills, resources, and support they need to thrive. Through education, mentorship, and hands-on training programs, Igire Rwanda helps these women unlock their potential, fostering their confidence and capabilities to lead in their communities. By offering opportunities in areas like entrepreneurship, technology, and leadership, the organization accelerates their journey toward economic independence and personal growth. At Igire Rwanda, we believe that empowered women are key to building a brighter, more inclusive future for all.
              </p>
            </div>
            <button className="absolute -bottom-6 left-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center">
              Read more
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
          </div>
          <div className="relative h-[400px] rounded-tr-lg rounded-br-lg overflow-hidden">
            <img
              src="/shecancode3.jpg?height=400&width=600"
              alt="Event gathering"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}