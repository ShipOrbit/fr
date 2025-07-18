import { Package } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 rounded-full p-2 mr-3">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">ShipOrbit</span>
          </div>
          <p className="text-gray-400 mb-4">
            Revolutionizing global logistics through innovation and technology.
          </p>
          <p className="text-gray-500 text-sm">
            *ShipOrbit is a licensed logistics technology provider.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#shippers"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shippers
              </a>
            </li>
            <li>
              <a
                href="#carriers"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Carriers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#careers"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#support"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-500">© 2025 ShipOrbit. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
export default Footer;
