import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  Terminal,
  ChevronRight,
  Code2,
  Zap,
  BarChart,
  Bot,
  Search,
} from 'lucide-react';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Card from '../components/UI/Card';

export const LandingPage = () => {
  // Mini interactive preview on the hero
  const [demoType, setDemoType] = useState('SaaS');
  const [demoFeatures, setDemoFeatures] = useState(['Auth', 'Payments', 'Dashboard']);

  const toggleDemoFeature = (feat) => {
    setDemoFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="font-mono text-indigo-300 font-semibold">CYNBIT SCOPING ENGINE</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-400">Interactive Prototype</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Turn Your Ideas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-cyan-400">
                Into Real Products.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Skip vague "send message" contact forms. Cynbit's intelligent project assistant translates your raw software concept into a structured technical brief, realistic budget bracket, and milestone delivery roadmap in under 2 minutes.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/wizard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={ArrowRight}
                  className="w-full sm:w-auto shadow-glow text-base px-8 py-4"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link to="/track" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  leftIcon={Search}
                  className="w-full sm:w-auto text-base px-6 py-4"
                >
                  Track Existing Inquiry
                </Button>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-left">
              <div className="p-2">
                <div className="text-2xl font-bold font-mono text-white">2 Min</div>
                <div className="text-xs text-slate-400">Guided Scoping Flow</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold font-mono text-indigo-400">&lt; 24h</div>
                <div className="text-xs text-slate-400">Tech Lead Review</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold font-mono text-white">100%</div>
                <div className="text-xs text-slate-400">Transparent Pricing</div>
              </div>
              <div className="p-2">
                <div className="text-2xl font-bold font-mono text-cyan-400">MERN</div>
                <div className="text-xs text-slate-400">Production Architecture</div>
              </div>
            </div>
          </div>

          {/* Interactive Hero Widget Preview */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    cynbit-scoping-simulator.sh
                  </span>
                </div>
                <Badge variant="indigo" size="sm">Live Interactive Preview</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
                {/* Column 1: Choose Type */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase">1. Platform</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['SaaS', 'Mobile App', 'AI Automation', 'Web App'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setDemoType(t)}
                        className={`text-xs p-2.5 rounded-lg border text-left transition-all ${
                          demoType === t
                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: Choose Features */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-slate-400 uppercase">2. Modules</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Auth', 'Payments', 'Dashboard', 'AI Bot', 'Analytics', 'APIs'].map((f) => {
                      const active = demoFeatures.includes(f);
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleDemoFeature(f)}
                          className={`text-xs px-2.5 py-1.5 rounded-md border transition-all ${
                            active
                              ? 'bg-indigo-600 border-indigo-500 text-white font-medium'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Live Output */}
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-left">
                  <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    SIMULATED SCOPE
                  </div>
                  <div className="text-sm font-bold text-white">
                    {demoType} Solution
                  </div>
                  <div className="text-xs text-slate-400">
                    Modules: {demoFeatures.join(', ') || 'Core foundation'}
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-300">
                    Est. Effort: {demoFeatures.length > 3 ? '160 - 240 Hrs' : '80 - 120 Hrs'}
                  </div>
                </div>
              </div>

              {/* Callout below simulator */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">
                  Ready to specify your project with full budget brackets and timeline?
                </span>
                <Link to="/wizard">
                  <span className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                    Launch Full Wizard
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="indigo" size="sm">CORE ADVANTAGES</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Guided Inquiries Outperform Traditional Forms
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Standard "Contact Us" forms generate vague requests, back-and-forth emails, and delayed quotes. Cynbit's wizard scopes requirements systematically from minute one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 space-y-4 border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Granular Feature Matrix
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select specific capabilities including Auth, Payment Gateways, Dashboards, and AI Chatbots without ambiguous guesswork.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 space-y-4 border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Transparent Rupee Brackets
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated investment brackets from ₹25,000 to ₹3,00,000+ calibrated to Indian startup budgets and enterprise requirements.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 space-y-4 border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Instant Architecture Brief
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backend algorithms automatically estimate project complexity, delivery hours, and recommend optimal modern tech stacks.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 space-y-4 border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Unique Reference Tracking
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive a verifiable inquiry ID (e.g. CYN-2026-X8F9Q2) backed by MongoDB persistence for instant status tracking anytime.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="cyan" size="sm">THE WORKFLOW</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works: Concept to Delivery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A frictionless, 4-step architectural scoping journey designed for founders, product leads, and business stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
            <div className="font-mono text-2xl font-bold text-indigo-400">01</div>
            <h4 className="text-base font-semibold text-white">Select Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose your platform foundation: Website, Web App, Mobile App, AI Automation, or SaaS.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
            <div className="font-mono text-2xl font-bold text-cyan-400">02</div>
            <h4 className="text-base font-semibold text-white">Select Features</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curate feature blocks from authentication to AI conversational assistants and custom integrations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
            <div className="font-mono text-2xl font-bold text-indigo-400">03</div>
            <h4 className="text-base font-semibold text-white">Calibrate Investment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick your target budget bracket and timeline to align sprint velocity and engineering resources.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 relative">
            <div className="font-mono text-2xl font-bold text-emerald-400">04</div>
            <h4 className="text-base font-semibold text-white">Submit & Discovery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive your structured brief, unique reference ID, and schedule a technical discovery call within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Standards CTA Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-[#0F172A] to-slate-900 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-6">
            <Badge variant="emerald" size="sm" dot>PROTOTYPE READY</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Scope Your Next Big Launch?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              No endless email chains. Get an executive technical blueprint synthesized specifically for your product requirements.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/wizard">
                <Button size="lg" variant="primary" rightIcon={ArrowRight} className="shadow-glow">
                  Start Your Project Now
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="secondary">
                  Look Up Reference ID
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
