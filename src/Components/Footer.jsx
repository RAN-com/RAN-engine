import { FaFacebook, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-5">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-red-500 inline-block pb-2 mb-3">
              About Us
            </h3>
            <p className="text-gray-400 text-sm">
              We bring you the latest updates, news, and reviews from the gaming world. Join the battle!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-red-500 inline-block pb-2 mb-3">
              Quick Links
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Games</a></li>
              <li><a href="#" className="hover:text-red-500 transition">News</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold border-b-2 border-red-500 inline-block pb-2 mb-3">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition"><FaYoutube /></a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition"><FaDiscord /></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Gaming Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
