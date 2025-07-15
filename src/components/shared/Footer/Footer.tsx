import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import logo from "@/assets/image/logo.png"
import logo2 from "@/assets/image/logo-alt.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const Footer = () => {
    return (
        <>
            <footer className="bg-gray-50 dark:bg-accent border-t dark:border-t-0 border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Link to={'/'} className="dark:hidden">
                                        <img src={logo} alt="Book Nest" className='w-[100px]' />
                                    </Link>
                                    <Link to={'/'} className="hidden dark:block">
                                        <img src={logo2} alt="Book Nest" className='w-[100px]' />
                                    </Link>
                                </div>
                                <p className="text-[var(--text-color)] text-sm leading-relaxed">
                                    Your gateway to endless knowledge. Explore, borrow, and discover books that inspire and educate.
                                </p>
                            </div>


                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold dark:text-white uppercase tracking-wide">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Home</Link></li>
                                    <li><Link to="/books" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">All Books</Link></li>
                                    <li><Link to="/create-book" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Add Book</Link></li>
                                    <li><Link to="/borrow-summary" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Borrow Summary</Link></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold dark:text-white uppercase tracking-wide">Support</h3>
                                <ul className="space-y-2">
                                    <li><Link to="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Help Center</Link></li>
                                    <li><Link to="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Contact Us</Link></li>
                                    <li><Link to="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Privacy Policy</Link></li>
                                    <li><Link to="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200 text-sm">Terms of Service</Link></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold dark:text-white uppercase tracking-wide">Contact</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2 text-[var(--text-color)] text-sm">
                                        <Mail className="h-4 w-4" />
                                        <span>hello@bookverse.com</span>
                                    </li>
                                    <li className="flex items-center space-x-2 text-[var(--text-color)] text-sm">
                                        <Phone className="h-4 w-4" />
                                        <span>+1 (555) 123-4567</span>
                                    </li>
                                    <li className="flex items-center space-x-2 text-[var(--text-color)] text-sm">
                                        <MapPin className="h-4 w-4" />
                                        <span>123 Library St, Book City</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-gray-200 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-sm text-[var(--text-color)]">
                                © {new Date().getFullYear()} BookVerse. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200">
                                    <span className="sr-only">Facebook</span>
                                    <FaFacebook />
                                </a>
                                <a href="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200">
                                    <span className="sr-only">Twitter</span>
                                    <FaTwitter />
                                </a>
                                <a href="#" className="text-[var(--text-color)] hover:text-red-600 transition-colors duration-200">
                                    <span className="sr-only">Instagram</span>
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;