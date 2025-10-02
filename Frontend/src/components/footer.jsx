// src/components/Footer.jsx
import React from "react";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16 text-start">
      <div className="w-[95%] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-25 h-8 rounded-full"
              />
              <span className="font-bold text-2xl text-green-600">
                AI Tool Finder
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 font-semibold">
              Discover the best AI tools for your needs
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={18} />
              {/* <span>info@aitoolfinder.com</span> */}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-gray-600 text-sm font-semibold">
              <li><a href="#">Latest Launches</a></li>
              <li><a href="#">Top Products</a></li>
              <li><a href="#">Upcoming</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Trending</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-600 text-sm font-semibold">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Latest News</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Stay updated</h4>
            <p className="text-gray-600 text-sm mb-3 font-semibold">
              Subscribe to our newsletter for the latest AI tools and news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 font-semibold border rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-200 text-green-700 px-3 rounded-r-md hover:bg-green-300"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row items-center justify-between font-semibold text-sm text-gray-600">
          <p>© 2024 AI Tool Finder. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">About</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
