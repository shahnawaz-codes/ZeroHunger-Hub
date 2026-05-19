// src/components/layout/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import useMe from '@/hooks/user/useMe';

// Pages where navbar should start transparent (has hero behind it)
const TRANSPARENT_ROUTES = ['/'];

// Logo SVG — leaf mark matching ZeroHunger brand
function LogoMark() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="white" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s-8-7-8-12a8 8 0 0 1 16 0c0 5-8 12-8 12z" />
      <path d="M12 8c0 0-3 2.5-3 5" />
      <path d="M12 8c0 0 3 2.5 3 5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user } = useMe();
  const isAuthenticated = !!user;
  const isRestaurant = user?.role === 'restaurant';

  // Only start transparent on hero pages
  const canBeTransparent = TRANSPARENT_ROUTES.includes(pathname);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Determine nav visual state
  const isGlass = canBeTransparent && !scrolled && !mobileOpen;

  const navStyle = isGlass
    ? {
        background: 'rgba(1, 61, 60, 0.15)',
        backdropFilter: 'blur(14px) saturate(180%)',
        WebkitBackdropFilter: 'blur(14px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }
    : {
        background: '#01615f',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
      };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={navStyle}
      >
        <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center">

          {/* ── LEFT NAV ─────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Primary navigation">
            <Link
              href="/discover"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
            >
              <SearchIcon />
              Food nearby
            </Link>
            <Link
              href="/#how-it-works"
              className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
            >
              About
            </Link>
            <Link
              href="/discover"
              className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
            >
              Discover
            </Link>
          </nav>

          {/* ── CENTER LOGO ──────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 mx-auto md:mx-0"
            aria-label="ZeroHunger home"
          >
            <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
              <LogoMark />
            </div>
            <span
              className="text-[16px] font-black text-white tracking-tight hidden sm:block"
              style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
            >
              Zero<span className="text-brand-orange-500">Hunger</span>
            </span>
          </Link>

          {/* ── RIGHT NAV ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {isAuthenticated ? (
              <>
                {isRestaurant ? (
                  <Link
                    href="/restaurant"
                    className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/orders"
                    className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
                  >
                    My orders
                  </Link>
                )}
                <div className="w-px h-4 bg-white/25 mx-1" aria-hidden="true" />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-orange-500 flex items-center justify-center text-white text-[11px] font-black uppercase">
                    {user?.name?.[0] ?? 'U'}
                  </div>
                  <span className="text-[13px] font-semibold text-white/85 hover:text-white">
                    {user?.name?.split(' ')[0]}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/restaurant/register"
                  className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  Sign up as Business
                </Link>
                <div className="w-px h-4 bg-white/25 mx-1" aria-hidden="true" />
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-white/85 hover:text-white hover:bg-white/10 transition-all"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="ml-1 px-4 py-2 rounded-full bg-white text-brand-green-500 text-[13px] font-black hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ color: '#01615f' }}
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* ── MOBILE HAMBURGER ─────────────────────────── */}
          <button
            className="md:hidden ml-auto text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>
      </header>

      {/* ── MOBILE MENU ──────────────────────────────────── */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: '#01615f' }}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col px-5 pb-6 pt-2 gap-1">
          <Link href="/discover" className="flex items-center gap-2 px-3 py-3 rounded-xl text-white/85 font-semibold text-sm hover:bg-white/10 transition-all">
            <SearchIcon /> Food nearby
          </Link>
          <Link href="/#how-it-works" className="px-3 py-3 rounded-xl text-white/85 font-semibold text-sm hover:bg-white/10 transition-all">
            About
          </Link>
          <Link href="/restaurant/register" className="px-3 py-3 rounded-xl text-white/85 font-semibold text-sm hover:bg-white/10 transition-all">
            Business
          </Link>

          <div className="h-px bg-white/15 my-2" />

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-3 py-3 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              My account
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-3 py-3 rounded-xl text-white/85 font-semibold text-sm hover:bg-white/10 transition-all">
                Sign in
              </Link>
              <Link
                href="/register"
                className="mt-1 px-4 py-3 rounded-full bg-brand-orange-500 text-white font-black text-sm text-center hover:opacity-90 transition-opacity"
              >
                Get started — it's free
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Backdrop — closes mobile menu on outside click */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Spacer — prevents content from hiding under fixed navbar */}
      {!canBeTransparent && <div className="h-[60px]" aria-hidden="true" />}
    </>
  );
}