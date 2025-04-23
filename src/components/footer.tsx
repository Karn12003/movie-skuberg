export const Footer = () => {
  return (
    <footer className="bg-zinc-900 w-full text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} KinoShop. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 text-purple-400">
          <a href="#" className="hover:text-purple-300 transition-colors">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Terms of Service
          </a>
          <span>|</span>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
