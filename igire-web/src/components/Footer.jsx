import { FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa';
import Container from '../components/container';
import { quickLinks, companyLinks, visionText, tweets } from '../fakeDatas/footerData';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 px-6 md:px-[25px]">
            <Container>
                {/* Signup Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold">Sign up for updates</h2>
                        <p className="text-white w-3/4">
                            To receive updates from Igire Rwanda Organization Alert, including our latest toolkits, reports,
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 rounded-l-md bg-white text-black"
                            />
                            <button className="bg-black text-white font-bold p-2 rounded-r-md hover:bg-gray-600">Subscribe</button>
                        </div>
                        <div className="flex space-x-4 mt-2 md:mt-0">
                            <a href="#" className="hover:underline">Terms and Conditions</a>
                            <a href="#" className="hover:underline">Privacy Notice</a>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between mb-6">
                        {/* Logo and Vision Section */}
                        <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className="mb-4">
                                <img src="/logo.png" alt="Logo" className="w-20 h-auto" />
                            </div>
                            <h3 className="text-lg font-bold">Our vision</h3>
                            <p className="text-white">{visionText}</p>
                        </div>

                        {/* Quick Links Section */}
                        <div className="flex flex-col md:flex-row md:w-2/3 justify-around">
                            <div className="mb-4 md:mb-0 ">
                                <h4 className="font-semibold">Quick Links</h4>
                                <ul className="text-white space-y-2">
                                    {quickLinks.map((link, index) => (
                                        <a key={index} href={link.url}><li className='hover:text-gray-400'>{link.label}</li></a>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-4 md:mb-0">
                                <h4 className="font-semibold">Company</h4>
                                <ul className="text-white space-y-2 ">
                                    {companyLinks.map((link, index) => (
                                        <a key={index} href={link.url}><li className='hover:text-gray-400'>{link.label}</li></a>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Tweets Section */}
                        <div className="md:w-1/3">
                            <h4 className="font-semibold">Tweets</h4>
                            <p className="text-white">Stay tuned for our latest tweets and updates here.</p>
                            <div className="text-white mt-4 space-y-2">
                                {tweets.map((tweet, index) => (
                                    <p key={index}>{tweet}</p>
                                ))}
                            </div>
                            {/* Social Icons */}
                            <div className="flex space-x-4 mt-4">
                                <FaTwitter size={20} className="text-white hover:text-gray-400 cursor-pointer" />
                                <FaFacebookF size={20} className="text-white hover:text-gray-400 cursor-pointer" />
                                <FaYoutube size={20} className="text-white hover:text-gray-400 cursor-pointer" />
                                <FaLinkedinIn size={20} className="text-white hover:text-gray-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <hr className="border-gray-700 mb-4" />
                    <div className="text-white text-sm text-center">
                        <p>© 2024 ALL RIGHTS RESERVED. Igire Rwanda Organization (Reg. No. 327553) Company Reg. No. 02153193</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
