import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      image: {
        source: "/images/girls.jpg",
        alt: "Graduate"
      },
      title: "We're here to help you transform your career",
      description: "Our mission is to empower women in technology by providing them with the tools and resources they need to succeed. Research on Bruce H. Lipton, Ph.D. an Epigeneticist. Bruce Lipton is an American developmental biologist known for promoting the idea that genes and DNA can be manipulated by a person's beliefs. He is also known for his work on epigenetics.",
      button: {
        label: "read more",
        location: "/blogs"
      }
    },
    {
      id: 2,
      image: {
        source: "/images/students.jpg",
        alt: "girls"
      },
      title: "Empowering women in tech",
      description: "Discover how our programs are breaking barriers and creating opportunities for women in the technology sector.",
      button: {
        label: "read more",
        location: "/programs"
      }
    },
    {
      id: 3,
      image: {
        source: "/images/techer.jpg",
        alt: "girl"
      },
      title: "Success stories: From bootcamp to tech leader",
      description: "Read inspiring stories of women who have transformed their careers through our programs and are now leading in the tech industry.",
      button: {
        label: "read more",
        location: "/success-stories"
      }
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden ">
              <Image
                src={article.image.source}
                alt={article.image.alt}
                width={500}
                height={500}
                
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {article.description}
              </p>
              <Link href={article.button.location} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-300">
                {article.button.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}