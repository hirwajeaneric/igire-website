export const sampleData = [
  {
    title: "SheCanCode Program",
    slug: "shecancode",
    description: "SheCanCODE is an advanced computer programming coding Bootcamp for young women and girls in Rwanda; with its mission to promote diversity and inclusion in technology by promoting employment and innovation in the tech ecosystem.",
    buttonLabel: "Learn More",
    slideshowComponent: "Slideshow"
  },
  {
    title: "AWE Program",
    slug: "awe",
    description: "The Academy for Women Entrepreneurs program was created to provide women with the knowledge, networks, and access they need to start and grow successful businesses. The AWE program is a flexible educational opportunity that combines the online platform DreamBuilder with locally provided content, mentoring, and facilitation. Through DreamBuilder, a cohort of women learn core business skills such as strategic planning, marketing and finance, and then discuss the material with local facilitators and business partners.",
    buttonLabel: "Join Now",
    slideshowComponent: "Slideshow2"
  },
  // You can add more data items as needed
];
export const getWhatWeDoData = () => {
  return sampleData.map((item) => ({
    title: item.title,
    description: item.description,
    buttonLabel: item.buttonLabel,
    slideshowComponent: item.slideshowComponent,
    slug: item.slug
  }));
};
// Paragraph data to be included
export const paragraphData = "Igire Rwanda Organization is dedicated to empowering young girls and women, providing them with the skills, resources, and support they need to thrive. Through education, mentorship, and hands-on training programs, Igire Rwanda helps these women unlock their potential, fostering their confidence and capabilities to lead in their communities. ";