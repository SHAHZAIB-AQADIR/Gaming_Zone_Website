import { FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-white/60">
      <p>© 2025 Gaming Room. All Rights Reserved.</p>

      {/* Links */}
      <p className="my-2">
        Home | Games | Booking | Pricing | Contact
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-3">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-white hover:text-blue-500 transition" size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white hover:text-pink-500 transition" size={20} />
        </a>
        <a href="tel:+123456789">
          <FaPhone className="text-white hover:text-green-500 transition" size={20} />
        </a>
      </div>
    </footer>
  );
}
