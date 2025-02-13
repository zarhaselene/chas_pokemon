import { React } from "react";
import { Menu, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img src="pokeball.png" width="50" height="50" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-red-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-red-200 transition-colors">
              <Search size={20} />
            </button>
            <button className="text-white hover:text-red-200 transition-colors">
              <User size={20} />
            </button>
            <button className="md:hidden text-white hover:text-red-200 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
