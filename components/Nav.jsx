"use client";
import Link from "next/link";
import { Briefcase, User, Phone } from "lucide-react";

export const navLinks = [
  { href: "/services", label: "Services", icon: <Briefcase className="h-4 w-4" /> },
  { href: "/about", label: "About Me", icon: <User className="h-4 w-4" /> },
  { href: "/contact", label: "Contact Us", icon: <Phone className="h-4 w-4" /> },
];

export default function Nav() {
  return (
    <div className="hidden md:flex space-x-8 justify-center flex-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 text-gray-200 hover:text-emerald-400 transition-colors"
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
