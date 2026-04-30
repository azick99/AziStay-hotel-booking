import { Link } from "react-router-dom";
import { Plane, Sparkles } from "lucide-react";
import {
  FaSquareXTwitter,
  FaInstagram,
  FaSquareFacebook,
} from "react-icons/fa6";

const footerLinks = {
  Explore: [
    { label: "All Hotels", href: "/search" },
    { label: "Luxury", href: "/search?category=luxury" },
    { label: "Boutique", href: "/search?category=boutique" },
    { label: "Beach Resorts", href: "/search?tag=beach" },
    { label: "City Breaks", href: "/search?tag=city" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaSquareXTwitter, href: "#", label: "Twitter" },
  { icon: FaSquareFacebook, href: "#", label: "Instagram" },
  { icon: FaInstagram, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4"
            >
              <div className="bg-brand-500 p-2 rounded-xl">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                AziStay
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Discover the world's finest hotels with AI-powered recommendations
              tailored to your dream trip.
            </p>

            {/* AI CTA */}
            <Link
              to="/ai-planner"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600
                         text-white text-sm font-semibold px-4 py-2.5 rounded-xl
                         transition-colors duration-200"
            >
              <Sparkles className="w-4 h-4" />
              Try AI Trip Planner
            </Link>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AziStay. Built with React + TypeScript.
            <span className="ml-1 text-gray-600">
              Pet project for portfolio purposes.
            </span>
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 text-gray-500 hover:text-white hover:bg-gray-800
                           rounded-lg transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
