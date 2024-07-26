"use client";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About Us</h2>
          <p className="text-gray-400">
            We are committed to providing the best services to our clients. Our team of professionals is dedicated to ensuring customer satisfaction.
          </p>
          <Link href="/about"
            className="text-teal-500 hover:underline">Learn more
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/"
                className="text-gray-400 hover:text-white">Home
              </Link>
            </li>
            <li>
              <Link href="/services"
                 className="text-gray-400 hover:text-white">Services
              </Link>
            </li>
            <li>
              <Link href="/contact"
                 className="text-gray-400 hover:text-white">Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq"
             className="text-gray-400 hover:text-white">FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-teal-500" />
              <span>kumarmahaveer486@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-teal-500" />
              <span>+92 342 3915669</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-teal-500" />
              <span>Mithi @ Tharparkar Sindh</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <Link href="https://facebook.com"
               target="_blank" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
            </Link>
            <Link href="https://twitter.com"
            target="_blank" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
            </Link>
            <Link href="https://instagram.com"
             target="_blank" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
            </Link>
            <Link href="https://linkedin.com"
             target="_blank" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Mahaveer Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
