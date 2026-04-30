'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ─── data ─────────────────────────────────────────────────── */

const foodCards = [
  { emoji: '🍛', name: 'Biryani Box',       rest: 'Spice Garden',       orig: 280, disc: 110, badge: 'Closes 10 pm' },
  { emoji: '🍱', name: 'Thali Combo',       rest: 'Annapurna Kitchen',  orig: 220, disc: 90,  badge: '3 left'       },
  { emoji: '🌯', name: 'Veg Wrap × 2',      rest: 'Green Bites',        orig: 180, disc: 70,  badge: 'Closes 9 pm'  },
  { emoji: '🍝', name: 'Pasta + Garlic Bread', rest: 'Olive Tree Café', orig: 320, disc: 130, badge: '5 left'       },
];

const stats = [
  { num: '2,400+', label: 'meals saved this month' },
  { num: '180+',   label: 'restaurant partners'     },
  { num: '62%',    label: 'avg discount off MRP'    },
  { num: '840 kg', label: 'food waste prevented'    },
];

const steps = [
  {
    n: '01',
    title: 'Discover nearby',
    desc: 'Browse surplus meals from restaurants within your area, listed at steep discounts before they close.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Reserve & pick up',
    desc: 'Book your slot, pay at pickup. No delivery fees, no subscription. Just great food at honest prices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Save food & money',
    desc: 'Every meal you buy prevents waste and saves you up to 70% on restaurant-quality food.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const userPerks = [
  'Up to 70% off restaurant meals',
  'New deals listed every evening',
  'No delivery fee — just pick up',
  'Support local restaurants',
];

const restaurantPerks = [
  'Recover revenue from unsold food',
  'Zero listing fee to start',
  'You set the price and quantity',
  'Instant role upgrade — no approval wait',
];

/* ─── component ─────────────────────────────────────────────── */

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="font-manrope bg-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between px-6 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100'
          : 'bg-brand-green'
      }`}>

        {/* logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🍱</span>
          <span className={`font-syne font-extrabold text-xl tracking-tight ${scrolled ? 'text-brand-dark' : 'text-white'}`}>
            Zero<span className={scrolled ? 'text-brand-green' : 'text-brand-orange'}>Hunger</span>
          </span>
        </div>

        {/* actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-brand-green hover:bg-brand-green-light'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm font-bold px-4 py-2 rounded-lg bg-brand-orange text-brand-dark hover:opacity-90 transition-opacity"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6"
        style={{ background: 'linear-gradient(160deg, #212121 0%, #1a2e1a 55%, #212121 100%)' }}>

        {/* background glows */}
        <div className="pointer-events-none absolute top-[10%] right-[-80px] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute bottom-[5%] left-[-60px] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,152,0,0.12) 0%, transparent 70%)' }} />

        {/* live badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border mb-10"
          style={{ background: 'rgba(76,175,80,0.12)', borderColor: 'rgba(76,175,80,0.3)' }}>
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse_dot" />
          <span className="text-brand-green text-xs font-semibold tracking-wide">
            180+ restaurants listing live deals now
          </span>
        </div>

        {/* headline */}
        <h1 className="font-syne font-extrabold text-center text-white leading-[1.07] tracking-[-2px] mb-6"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)', maxWidth: 760 }}>
          Great food.{' '}
          <span className="text-brand-green">Half the price.</span>{' '}
          <span className="text-brand-orange">Zero waste.</span>
        </h1>

        <p className="text-center text-white/60 text-lg leading-relaxed mb-12" style={{ maxWidth: 500 }}>
          Restaurants near you list leftover meals at deep discounts before closing.
          You eat well. They waste nothing. Everyone wins.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-xl bg-brand-orange text-brand-dark font-bold text-base hover:opacity-90 transition-opacity"
          >
            Browse food near me
          </Link>
          <Link
            href="/register"
            className="px-7 py-3.5 rounded-xl text-white font-semibold text-base border border-white/20 hover:bg-white/5 transition-colors"
          >
            List my restaurant →
          </Link>
        </div>

        {/* floating food cards preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
          {foodCards.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl p-4 backdrop-blur-md border"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <span className="text-3xl block mb-3">{item.emoji}</span>
              <p className="text-white font-bold text-sm leading-tight mb-0.5">{item.name}</p>
              <p className="text-white/40 text-xs mb-3">{item.rest}</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-syne font-extrabold text-brand-green text-lg">₹{item.disc}</span>
                <span className="text-white/30 text-xs line-through">₹{item.orig}</span>
              </div>
              <span
                className="inline-block text-[10px] font-bold text-brand-orange px-2 py-0.5 rounded-md tracking-wide"
                style={{ background: 'rgba(255,152,0,0.12)', border: '1px solid rgba(255,152,0,0.25)' }}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <section className="bg-brand-green py-8 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/25">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="font-syne font-extrabold text-white text-2xl tracking-tight">{s.num}</p>
              <p className="text-white/70 text-xs font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-brand-green text-[11px] font-bold tracking-[2.5px] uppercase mb-3">
            How it works
          </p>
          <h2 className="font-syne font-extrabold text-brand-dark text-center tracking-tight mb-16"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-1px' }}>
            From kitchen to your hands<br className="hidden md:block" /> in three steps
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.title} className="relative">
                {/* icon box */}
                <div className="w-14 h-14 rounded-2xl bg-brand-green-light text-brand-green-dark flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                {/* ghost number */}
                <span className="absolute top-3 left-16 font-syne font-extrabold text-gray-100 text-5xl leading-none select-none pointer-events-none">
                  {step.n}
                </span>
                <h3 className="font-syne font-extrabold text-brand-dark text-lg mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dual value prop ─────────────────────────────────── */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5">

          {/* for users */}
          <div className="relative overflow-hidden rounded-2xl bg-brand-dark p-10">
            {/* decorative circle */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full"
              style={{ background: 'rgba(76,175,80,0.12)' }} />
            <p className="text-brand-green text-[11px] font-bold tracking-[2.5px] uppercase mb-5">
              For food lovers
            </p>
            <h3 className="font-syne font-extrabold text-white text-2xl leading-tight tracking-tight mb-5">
              Eat restaurant food<br />on a street food budget
            </h3>
            <ul className="space-y-3 mb-8">
              {userPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="inline-block bg-brand-orange text-brand-dark font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Find food near me
            </Link>
          </div>

          {/* for restaurants */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-10">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand-green-light" />
            <p className="text-brand-green text-[11px] font-bold tracking-[2.5px] uppercase mb-5">
              For restaurants
            </p>
            <h3 className="font-syne font-extrabold text-brand-dark text-2xl leading-tight tracking-tight mb-5">
              Turn unsold food<br />into real revenue
            </h3>
            <ul className="space-y-3 mb-8">
              {restaurantPerks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="w-5 h-5 rounded-full bg-brand-green-light border border-brand-green/30 flex items-center justify-center text-brand-green-dark text-[10px] font-bold flex-shrink-0">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="inline-block bg-brand-green text-white font-bold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              List my restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="mx-6 mb-16 rounded-2xl overflow-hidden" style={{ background: '#212121' }}>
        <div className="px-10 py-16 flex flex-col items-center text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(76,175,80,0.15) 0%, transparent 65%)' }} />
          <p className="text-brand-green text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
            Join the movement
          </p>
          <h2 className="font-syne font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-1px', maxWidth: 560 }}>
            Every meal saved is a<br className="hidden md:block" /> small act of change
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10" style={{ maxWidth: 440 }}>
            Join 2,400+ people already eating affordably and reducing food waste in their city.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-brand-orange text-brand-dark font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Start saving food today
            </Link>
            <Link
              href="/login"
              className="px-7 py-3.5 rounded-xl text-white/70 font-semibold text-sm border border-white/15 hover:bg-white/5 transition-colors"
            >
              Already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="px-6 pb-10 pt-2">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍱</span>
            <span className="font-syne font-extrabold text-brand-dark tracking-tight">
              Zero<span className="text-brand-green">Hunger</span>
            </span>
          </div>
          <p className="text-gray-400 text-xs text-center">
            © 2025 ZeroHunger · Fighting food waste, one meal at a time
          </p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <Link key={l} href="#" className="text-gray-400 text-xs hover:text-brand-green transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}