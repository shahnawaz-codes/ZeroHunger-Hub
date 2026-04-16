"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">🌱</div>
            <span className="font-bold text-xl">ZeroHunger</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="text-primary-600 border-white hover:bg-primary-50"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="cta-button">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link block text-center py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 px-2">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                className="text-primary-600 border-white"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" fullWidth className="cta-button">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
