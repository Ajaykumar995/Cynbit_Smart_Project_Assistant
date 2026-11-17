import React from 'react';
import { Calendar, Zap, Clock, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const timelineOptions = [
  {
    id: '< 2 Weeks',
    title: 'Rapid Sprint (< 2 Weeks)',
    badge: 'Fast Track',
    badgeVariant: 'amber',
    icon: Zap,
    description: 'Emergency prototyping, hackathon-ready MVPs, or rapid investor pitch demos.',
    pace: 'High Velocity / Daily Standups',
  },
  {
    id: '1 Month',
    title: '1 Month (Standard Sprint)',
    badge: 'Recommended',
    badgeVariant: 'indigo',
    popular: true,
    icon: Clock,
    description: 'The golden standard for launching a polished, production-ready MVP or focused SaaS web app.',
    pace: 'Bi-weekly Milestone Reviews',
  },
  {
    id: '2 – 3 Months',
    title: '2 – 3 Months (Full Lifecycle)',
    badge: 'Comprehensive',
    badgeVariant: 'cyan',
    icon: Calendar,
    description: 'Complete product cycle including custom Figma UI/UX, multi-role backend, testing, and CI/CD pipelines.',
    pace: 'Structured 2-Week Agile Sprints',
  },
  {
    id: '3 – 6 Months',
    title: '3 – 6 Months (Enterprise Scale)',
    badge: 'Enterprise',
    badgeVariant: 'purple',
    icon: Shield,
    description: 'Complex enterprise architectures, deep AI pipeline integrations, and cross-platform mobile apps.',
    pace: 'Dedicated Engineering Squad',
  },
  {
    id: 'Flexible / Milestone-Driven',
    title: 'Flexible / Milestone-Driven',
    badge: 'Iterative',
    badgeVariant: 'emerald',
    icon: Sparkles,
    description: 'No strict rush. Prioritize continuous iteration and quality based on user testing and user feedback.',
    pace: 'Flexible Cadence',
  },
];

export const Step4Timeline = () => {
  const { formData, updateFormData } = useWizard();

  const handleSelect = (id) => {
    updateFormData({ timeline: id });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Phase 04</Badge>
          <span className="text-xs font-mono text-slate-400">DELIVERY TIMELINE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What is your target launch timeline?
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Select your ideal delivery schedule so our tech leads can allocate sprint capacity and engineer the milestone roadmap.
        </p>
      </div>

      {/* Grid of Timeline Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timelineOptions.map((opt) => {
          const isSelected = formData.timeline === opt.id;
          const IconComponent = opt.icon;

          return (
            <Card
              key={opt.id}
              interactive
              selected={isSelected}
              onClick={() => handleSelect(opt.id)}
              className="p-5 flex flex-col justify-between text-left cursor-pointer transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-glow'
                          : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <Badge variant={opt.badgeVariant} size="sm">
                      {opt.badge}
                    </Badge>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  )}
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">
                  {opt.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {opt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block truncate">
                  Cadence: <span className="text-slate-300">{opt.pace}</span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Step4Timeline;
