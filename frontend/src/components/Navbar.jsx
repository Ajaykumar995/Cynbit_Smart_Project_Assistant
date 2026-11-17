import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Layers, Search, Menu, X, Sparkles, ShieldAlert, LayoutDashboard } from 'lucide-react';
import Button from './UI/Button';
import Badge from './UI/Badge';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-850/80 bg-[#090D16]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0F172A] rounded-[7px] flex items-center justify-center">
              <span className="font-mono font-black text-indigo-400 text-lg leading-none">C</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-base sm:text-lg">
                Cynbit
              </span>
              <Badge variant="indigo" size="sm" className="hidden sm:inline-flex">
                Assistant
              </Badge>
            </div>
            <span className="text-[10px] text-slate-400 -mt-0.5 font-mono tracking-wider">
              PROJECT SCOPING ENGINE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className={`transition-colors hover:text-white ${
              location.pathname === '/' ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            Overview
          </Link>
          <a
            href="/#features"
            className="transition-colors hover:text-white"
          >
            Capabilities
          </a>
          <a
            href="/#how-it-works"
            className="transition-colors hover:text-white"
          >
            How It Works
          </a>
          <Link
            to="/track"
            className={`flex items-center gap-1.5 transition-colors hover:text-white ${
              location.pathname === '/track' ? 'text-indigo-400 font-semibold' : ''
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Inquiry</span>
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              location.pathname === '/admin'
                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 font-semibold'
                : 'text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/track">
            <Button variant="outline" size="sm" leftIcon={Search}>
              Track Status
            </Button>
          </Link>
          <Link to="/wizard">
            <Button
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
              className="shadow-glow"
            >
              Start Your Project
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="px-2">
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
            </Button>
          </Link>
          <Link to="/wizard">
            <Button variant="primary" size="sm">
              Start
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0F172A] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Overview
            </Link>
            <a
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Capabilities
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              How It Works
            </a>
            <Link
              to="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Existing Inquiry</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Admin Management Console</span>
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link to="/wizard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full" rightIcon={ArrowRight}>
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
