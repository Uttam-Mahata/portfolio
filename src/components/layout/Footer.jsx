import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/Uttam-Mahata",
      label: "GitHub"
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/uttam-mahata-4b0364259/",
      label: "LinkedIn"
    },
    {
      icon: <FaFacebook className="w-6 h-6" />,
      href: "https://www.facebook.com/dummy.uttam.0.0.0.0/",
      label: "Facebook"
    }

  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-xl font-semibold">Uttam Mahata</p>
            {/* <p className="text-sm mt-2">Full Stack Developer</p> */}
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {currentYear} Utam Mahata. All rights reserved.</p>
          <p className="mt-2">
            {/* Made with ❤️ using React & Tailwind CSS */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
