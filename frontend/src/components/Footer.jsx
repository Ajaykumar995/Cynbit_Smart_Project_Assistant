import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowUpRight, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import Badge from './UI/Badge';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070A12] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono font-bold">
                C
              </div>
              <span className="font-bold text-slate-100 tracking-tight text-lg">
                Cynbit Smart Project Assistant
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              An intelligent requirements scoping engine designed to replace traditional contact forms with guided, production-grade architectural briefs.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="indigo" size="sm">MERN Stack</Badge>
              <Badge variant="cyan" size="sm">MongoDB Atlas</Badge>
              <Badge variant="default" size="sm">Tailwind CSS</Badge>
              <Badge variant="emerald" size="sm">Vite + React</Badge>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/wizard" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Start Project Wizard
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1">
                  Track Inquiry Status
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <a href="/#features" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Scoping Capabilities
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Assessment & Engineering Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Assessment Context
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built as an independent full-stack prototype for the Full Stack Developer Intern assessment at <strong className="text-slate-200">Cynbit Technologies</strong>.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                API Health: Operational
              </div>
              <div className="text-slate-400">REST Endpoints validated & live</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Cynbit Technologies Assessment Prototype. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Secure Data Transmission
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Node.js + Express API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
