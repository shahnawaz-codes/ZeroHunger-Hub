import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="font-sans antialiased bg-neutral-50 text-neutral-900 min-h-screen flex flex-col selection:bg-brand-green-200 selection:text-brand-green-900">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 transition-all duration-300">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-xl font-display font-bold text-neutral-900 tracking-tight">Zero Hunger</span>
          </div>
          
          <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-500">
            <li><Link href="#how-it-works" className="hover:text-brand-green-600 transition-colors">How it works</Link></li>
            <li><Link href="#benefits" className="hover:text-brand-green-600 transition-colors">Benefits</Link></li>
            <li><Link href="#mission" className="hover:text-brand-green-600 transition-colors">Our Mission</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-neutral-700 hover:text-brand-green-600 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/register" className="text-sm font-medium bg-brand-green-600 text-white px-5 py-2.5 rounded-full hover:bg-brand-green-700 shadow-sm hover:shadow transition-all active:scale-95">
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex-grow flex items-center justify-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-green-100/50 blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-green-200/30 blur-3xl opacity-50" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-50 border border-brand-green-100 text-brand-green-700 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green-500"></span>
            </span>
            Join the Movement
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-neutral-900 leading-tight tracking-tight mb-6">
            Rescue surplus food. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-600 to-teal-500">
              Save money.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with local restaurants and stores to buy delicious unsold food at a fraction of the price. Good for your wallet, great for the planet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-brand-green-600 text-white font-medium rounded-full shadow-lg shadow-brand-green-500/30 hover:bg-brand-green-700 hover:shadow-brand-green-500/40 transition-all active:scale-95 text-center text-lg">
              Get Started Now
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-700 border border-neutral-200 font-medium rounded-full hover:bg-neutral-50 hover:border-neutral-300 transition-all text-center text-lg group">
              Learn more 
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white relative border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">How it works</h2>
            <p className="text-neutral-500 text-lg">Rescuing food is as easy as 1-2-3. It's a win for everyone.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-brand-green-100 via-brand-green-200 to-brand-green-100 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-brand-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-brand-green-100 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-10 h-10 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">1. Find a Surprise Bag</h3>
              <p className="text-neutral-500 leading-relaxed">
                Browse the map or list to find participating stores and restaurants near you with surplus food.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-brand-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-brand-green-100 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-10 h-10 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">2. Reserve & Pay</h3>
              <p className="text-neutral-500 leading-relaxed">
                Reserve your bag directly in the app at a huge discount. You pay securely before you go.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-brand-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-brand-green-100 group-hover:-translate-y-2 transition-all duration-300">
                <svg className="w-10 h-10 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">3. Pick up & Enjoy</h3>
              <p className="text-neutral-500 leading-relaxed">
                Head to the store during the specified pickup window, show your order, and enjoy your food!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">A win-win for everyone</h2>
            <p className="text-neutral-500 text-lg">Whether you are hungry for a deal or running a business, Zero Hunger delivers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* For Users */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-green-50 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-7 h-7 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">For Food Lovers</h3>
              <ul className="space-y-4">
                {[
                  { title: "Great food at 1/3 of the price", desc: "Enjoy high-quality meals, groceries, and treats for a fraction of the original cost." },
                  { title: "Discover new local spots", desc: "Find hidden gems and new favorite restaurants in your neighborhood." },
                  { title: "Help the environment", desc: "Every bag you rescue helps reduce greenhouse gas emissions from food waste." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-brand-green-100 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                      <p className="text-neutral-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Restaurants */}
            <div className="bg-neutral-900 rounded-3xl p-8 lg:p-12 shadow-sm border border-neutral-800 text-white hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-600/20 blur-3xl rounded-full -z-10" />
              <div className="w-14 h-14 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center mb-8">
                <svg className="w-7 h-7 text-brand-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">For Businesses</h3>
              <ul className="space-y-4">
                {[
                  { title: "Recover sunk costs", desc: "Turn food that would have been thrown away into extra revenue." },
                  { title: "Attract new customers", desc: "Reach a new audience of eco-conscious consumers who may become regulars." },
                  { title: "Zero extra effort", desc: "Pack your surplus at the end of the day. We handle the payments and marketing." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-brand-green-500/20 border border-brand-green-500/30 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-100">{item.title}</h4>
                      <p className="text-neutral-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-green-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-500 rounded-full blur-3xl opacity-50 -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green-700 rounded-full blur-3xl opacity-50 -z-0" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to make an impact?</h2>
          <p className="text-brand-green-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of users and businesses working together to eliminate food waste and build a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-green-700 font-semibold rounded-full shadow-lg hover:bg-neutral-50 transition-all active:scale-95 text-center">
              Sign Up as User
            </Link>
            <Link href="/restaurant/register" className="w-full sm:w-auto px-8 py-4 bg-brand-green-700 text-white font-semibold rounded-full border border-brand-green-500 hover:bg-brand-green-800 transition-all active:scale-95 text-center">
              Partner with us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xl font-display font-bold text-white tracking-tight">Zero Hunger</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Empowering communities to reduce food waste and save money. Let's build a sustainable future together.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/discover" className="hover:text-white transition-colors">Discover food</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} Zero Hunger Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Social Links placeholders */}
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-brand-green-600 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center hover:bg-brand-green-600 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
