import {
    FacebookIcon,
    InstagramIcon,
    Linkedin,
    YoutubeIcon,
    MailIcon,
    PhoneIcon,
    MapPin,
} from 'lucide-react';
import { FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <footer className="px-15 footer shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    {/* Logo and Slogan */}
                    <div className="flex items-center space-x-2">
                        <FaBoxOpen className="text-[var(--light-h1-text)] dark:text-blue-500" size={28} />
                        <span className="text-lg font-semibold text-[#1A1A1A] text-gray-600">ProductWise</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 md:mt-0">
                        Smart Amazon Product AI Comparison with AI.
                    </p>
                </motion.div>

                {/* Middle Grid */}
                <motion.div
                    className="grid grid-cols-1 text-gray-600 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    {/* Company */}
                    <div>
                        <h3 className="font-bold mb-3">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-600">Home</a></li>
                            {/* <li><a href="#" className="hover:text-blue-600">Pro Features</a></li>
                            <li><a href="#" className="hover:text-blue-600">Our Company</a></li> */}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold mb-3">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <MailIcon size={16} className="text-blue-600" /> info@productwise.com
                            </li>
                            <li className="flex items-center gap-2">
                                <PhoneIcon size={16} className="text-blue-600" /> +045 424 123 543
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-blue-600" /> Jakarta, Indonesia
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="font-bold mb-3">Find Us On</h3>
                        <ul className="space-y-3">
                            <div className="flex items-center gap-3 mt-2 md:mt-0">
                                <a href="#" className="text-gray-600 hover:text-blue-600"><Linkedin size={20} /></a>
                                <a href="#" className="text-gray-600 hover:text-blue-600"><InstagramIcon size={20} /></a>
                                <a href="#" className="text-gray-600 hover:text-blue-600"><FacebookIcon size={20} /></a>
                                <a href="#" className="text-gray-600 hover:text-blue-600"><YoutubeIcon size={20} /></a>
                            </div>

                        </ul>
                    </div>
                </motion.div>

                {/* Bottom */}
                <motion.div
                    className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    {/* Social Icons */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                    </div>

                    {/* Legal Links */}
                    <div className="text-xs text-gray-500 flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
                        <p>&copy; 2025 ProductWise. All rights reserved.</p>
                        <a href="#" className="hover:text-blue-600">Terms and Conditions</a>
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Cookies</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
