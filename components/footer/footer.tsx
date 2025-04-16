import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">MovieStream</h3>
            <p className="text-sm mb-4">
              Your ultimate destination for endless entertainment. Stream your favorite movies and shows anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-purple-500 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">Movies</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">TV Shows</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">New Releases</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">My List</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>support@falconmoviestream.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+254 707 497 200</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>Kahawa West, Nairobi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-red-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Falcon-Eye.MovieStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;