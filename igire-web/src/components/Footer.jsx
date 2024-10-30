import { FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa';
import Container from './container';
const Footer = () => {
    return (
     
        <footer className="bg-gray-900 text-white py-8 px-6 md:px-[25px]">
             <Container>
      {/* Signup Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold">Sign up for updates</h2>
          <p className="text-gray-400">
            To receive updates from International Alert, including our latest toolkits, reports,
            campaigns, and examples of peacebuilding, please enter your details.
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md bg-white text-black"
          />
          <button className="bg-gray-700 text-white font-bold p-2 rounded-r-md">Subscribe</button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-700 pt-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          {/* Logo and Vision Section */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            {/* Logo */}
            <div className="mb-4">
              <img src="/logo.png" alt="Logo" className="w-20 h-auto" /> {/* Replace /path-to-logo/logo.png with actual path */}
            </div>
            <h3 className="text-lg font-bold">Our vision</h3>
            <p className="text-gray-400">
              Our vision is that people and their societies can resolve conflicts without violence, working together to build sustainable and inclusive peace.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col md:flex-row md:w-2/3 justify-around ">
            <div className="mb-4 md:mb-0  ">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="text-gray-400 space-y-2">
              <a href=""> <li>Expertise</li></a> 
               <a href=""><li>Locations</li></a> 
               <a href=""> <li>Insights</li></a> 
                <a href=""><li>Media centre</li></a>
              </ul>
            </div>
            
            <div className="mb-4 md:mb-0  ">
              <h4 className="font-semibold">Company</h4>
              <ul className="text-gray-400 space-y-2">
               <a href=""> <li>About</li></a>
               <a href=""><li>Jobs</li></a> 
               <a href=""> <li>Policies</li></a>
              <a href="">  <li>Contact us</li></a>
              </ul>
            </div>
          </div>

          {/* Tweets Section (aligned to the right) */}
          <div className="md:w-1/3">
            <h4 className="font-semibold">Tweets</h4>
            <p className="text-gray-400">Stay tuned for our latest tweets and updates here.</p>
            {/* Placeholder for tweets - You can replace this with actual Twitter integration */}
            <div className="text-gray-400 mt-4 space-y-2">
              <p>Tweet 1: Example tweet content here...</p>
              <p>Tweet 2: Example tweet content here...</p>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <FaTwitter size={20} className="text-gray-400 hover:text-white" />
              <FaFacebookF size={20} className="text-gray-400 hover:text-white" />
              <FaYoutube size={20} className="text-gray-400 hover:text-white" />
              <FaLinkedinIn size={20} className="text-gray-400 hover:text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Section with Terms and Conditions */}
        <hr className="border-gray-700 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 ALL RIGHTS RESERVED. International Alert is a registered charity in England and Wales (Reg. No. 327553) Company Reg. No. 02153193</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">Terms and Conditions</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
          </div>
        </div>
                </div>
                </Container>
            </footer>
  );
};

export default Footer;
