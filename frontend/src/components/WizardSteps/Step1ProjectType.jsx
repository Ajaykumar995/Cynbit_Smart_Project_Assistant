import React from 'react';
import { Globe, LayoutGrid, Smartphone, Bot, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const projectTypes = [
  {
    id: 'Web App',
    title: 'Web Application',
    description: 'Dynamic, feature-rich interactive web platforms with custom dashboards and workflows.',
    icon: LayoutGrid,
    recommendedStack: 'React / Next.js + Node / Mongo',
    popular: true,
  },
  {
    id: 'SaaS',
    title: 'SaaS Platform',
    description: 'Multi-tenant subscription software with billing, team permissions, and analytics.',
    icon: Cloud,
    recommendedStack: 'Next.js 14 + Node + Stripe',
    popular: true,
  },
  {
    id: 'AI Automation',
    title: 'AI Automation & Agents',
    description: 'Intelligent LLM chatbots, workflow automations, RAG pipelines, and agentic workflows.',
    icon: Bot,
    recommendedStack: 'Python / LangChain + React',
    popular: true,
  },
  {
    id: 'Mobile App',
    title: 'Mobile Application',
    description: 'iOS and Android cross-platform mobile apps with native device capabilities.',
    icon: Smartphone,
    recommendedStack: 'React Native / Flutter + REST API',
  },
  {
    id: 'Website',
    title: 'Modern Website / Landing',
    description: 'Ultra-fast marketing sites, corporate showcases, and high-conversion landing pages.',
    icon: Globe,
    recommendedStack: 'Next.js / Astro + Tailwind CSS',
  },
  {
    id: 'Other',
    title: 'Custom Solution / Other',
    description: 'Bespoke APIs, backend microservices, data engineering, or hybrid architectures.',
    icon: Sparkles,
    recommendedStack: 'Custom Tailored Stack',
  },
];

export const Step1ProjectType = () => {
  const { formData, updateFormData } = useWizard();

  const handleSelect = (id) => {
    updateFormData({ projectType: id });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Phase 01</Badge>
          <span className="text-xs font-mono text-slate-400">ARCHITECTURAL FOUNDATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What type of software are you building?
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Select the core category that best describes your project. We'll tailor the feature scoping and tech stack to match.
        </p>
      </div>

      {/* Grid of Project Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((type) => {
          const isSelected = formData.projectType === type.id;
          const IconComponent = type.icon;

          return (
            <Card
              key={type.id}
              interactive
              selected={isSelected}
              onClick={() => handleSelect(type.id)}
              className="p-5 flex flex-col justify-between relative group text-left cursor-pointer transition-all duration-200"
            >
              {type.popular && (
                <div className="absolute top-3 right-3">
                  <Badge variant="cyan" size="sm">Popular</Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-glow'
                        : 'bg-slate-800 text-slate-300 group-hover:text-indigo-400 group-hover:bg-slate-800/90'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  )}
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5 flex items-center gap-2">
                  {type.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {type.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block truncate">
                  Stack: <span className="text-slate-300">{type.recommendedStack}</span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Step1ProjectType;
