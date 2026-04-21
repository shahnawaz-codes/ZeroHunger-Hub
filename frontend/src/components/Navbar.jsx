'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/search', label: 'Explore', icon: SearchIcon },
  { href: '/orders', label: 'Orders', icon: BagIcon },
  { href: '/restaurant', label: 'Restaurant', icon: StoreIcon },
];

/**
 * Render the site's responsive navigation UI with a top header for desktop and a bottom bar for mobile.
 *
 * The header includes the logo, desktop navigation pills with route-aware active styling, and right-side actions;
 * the mobile bar shows icon+label links with the same active logic derived from the current pathname.
 * Active state is computed so the root path (`/`) is active only when the pathname equals `/`, and other items are active when the pathname starts with their `href`.
 *
 * @returns {JSX.Element} The Navbar element containing the desktop header and mobile bottom navigation.
 */
export function Navbar() {
  const pathname = usePathname();
  const isRestaurant = pathname.startsWith('/restaurant');

  return (
    <>
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-[#111] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">
              Zero<span className="text-primary-500">Hunger</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? 'bg-primary-500 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
              <span>📍</span>
              <span>Ahmedabad</span>
              <ChevronIcon />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
              SR
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/10 pb-safe">
        <div className="grid grid-cols-4 h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  active ? 'text-primary-500' : 'text-white/40'
                }`}
              >
                <Icon size={active ? 22 : 20} />
                <span className="text-[10px] font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

/**
 * Render a home-shaped SVG icon.
 * @param {number} [size=20] - Width and height of the icon in pixels.
 * @returns {JSX.Element} The SVG element representing a home icon.
 */
function HomeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}
/**
 * Renders a magnifying-glass (search) SVG icon.
 * @param {Object} props
 * @param {number} [props.size=20] - Icon width and height in pixels.
 * @returns {JSX.Element} The SVG element representing a search icon.
 */
function SearchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
/**
 * Renders a shopping bag SVG icon.
 * @param {Object} props
 * @param {number} [props.size=20] - Icon width and height in pixels.
 * @returns {JSX.Element} A bag-shaped SVG icon.
 */
function BagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
/**
 * Render a storefront SVG icon.
 *
 * @param {number} [size=20] - Icon width and height in pixels.
 * @returns {JSX.Element} The SVG element for a store/front storefront icon sized to the given `size`.
 */
function StoreIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
/**
 * Renders a downward chevron SVG icon.
 * @returns {JSX.Element} An SVG element representing a downwards-pointing chevron.
 */
function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
