import React from 'react';
import { IndianRupee, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const budgetTiers = [
  {
    id: '₹25,000 – ₹50,000',
    title: 'Rapid MVP / Prototype',
    amount: '₹25K – ₹50K',
    description: 'Fast-track prototype or minimum viable product to validate your concept with real users and investors.',
    deliverables: ['Core User Flow', 'Clean UI Design', 'Essential Database & API', '2 Weeks Sprint'],
    recommendedFor: 'Early-stage founders & validation sprints',
  },
  {
    id: '₹50,000 – ₹1,00,000',
    title: 'Standard Production App',
    amount: '₹50K – ₹1L',
    popular: true,
    description: 'Production-ready web or mobile application with authentication, dashboards, database indexing, and testing.',
    deliverables: ['Custom Auth & Security', 'Interactive Dashboard', 'Payment Gateway Integration', 'Cloud Deployment'],
    recommendedFor: 'Growing startups & small businesses',
  },
  {
    id: '₹1,00,000 – ₹2,00,000',
    title: 'Scalable SaaS & Platform',
    amount: '₹1L – ₹2L',
    description: 'Complete multi-tenant platform with subscription management, external APIs, notifications, and analytics.',
    deliverables: ['Multi-tenant SaaS Architecture', 'Stripe/Razorpay Billing', 'Third-party Integrations', 'High-performance Caching'],
    recommendedFor: 'Funded ventures & B2B SaaS builders',
  },
  {
    id: '₹2,00,000 – ₹3,00,000+',
    title: 'Enterprise & AI Systems',
    amount: '₹2L – ₹3L+',
    description: 'Advanced custom engineering including agentic AI pipelines, cross-platform mobile apps, and microservice infrastructure.',
    deliverables: ['Custom AI / LLM Workflows', 'Cross-Platform Mobile + Web', 'Enterprise RBAC & Audit Logs', 'Dedicated SLA Support'],
    recommendedFor: 'Established businesses & complex ecosystems',
  },
  {
    id: 'Undecided / Consultation',
    title: 'Undecided / Need Scoping Consultation',
    amount: 'Scoping Call',
    description: 'Not sure of the exact investment yet? Our technical architect will review your brief and recommend the most cost-efficient path.',
    deliverables: ['Technical Feasibility Study', 'Tailored Milestone Breakdown', 'Architecture Roadmap Call'],
    recommendedFor: 'Exploring ideas or flexible scopes',
  },
];

export const Step3Budget = () => {
  const { formData, updateFormData } = useWizard();

  const handleSelect = (id) => {
    updateFormData({ budget: id });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Phase 03</Badge>
          <span className="text-xs font-mono text-slate-400">FINANCIAL ALIGNMENT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What is your anticipated investment bracket?
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Transparent pricing guidelines tailored to the Indian and global development market. No surprises or hidden costs.
        </p>
      </div>

      {/* Grid of Budget Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetTiers.map((tier) => {
          const isSelected = formData.budget === tier.id;

          return (
            <Card
              key={tier.id}
              interactive
              selected={isSelected}
              onClick={() => handleSelect(tier.id)}
              className={`p-5 flex flex-col justify-between text-left cursor-pointer transition-all duration-200 relative group ${
                tier.popular ? 'border-indigo-500/40' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-3 right-3">
                  <Badge variant="indigo" size="sm">Most Popular</Badge>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {tier.amount}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  )}
                </div>

                <h3 className="text-sm font-semibold text-indigo-300 mb-1">
                  {tier.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {tier.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 mb-4">
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 block truncate">
                  Ideal for: <span className="text-slate-300 font-medium">{tier.recommendedFor}</span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Notice info */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <span>
          Budgets include design, development, quality testing, and deployment setup. All milestone payments are linked to tangible sprint demos.
        </span>
      </div>
    </div>
  );
};

export default Step3Budget;
