import React, { useState } from 'react';
import {
  ShieldCheck,
  BarChart3,
  CreditCard,
  Webhook,
  Bot,
  LineChart,
  Layers,
  Bell,
  HardDrive,
  Globe2,
  Plus,
  Check,
  X,
} from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const availableFeatures = [
  {
    id: 'Authentication',
    title: 'User Authentication & RBAC',
    description: 'Secure JWT/Session auth, Social logins (Google/GitHub), role-based permissions.',
    category: 'Security & Access',
    icon: ShieldCheck,
  },
  {
    id: 'Dashboard',
    title: 'Interactive Dashboard',
    description: 'Custom metric cards, interactive charts, data filtering, and CSV/PDF reports.',
    category: 'Core Experience',
    icon: BarChart3,
  },
  {
    id: 'Payments',
    title: 'Payment Gateway & Billing',
    description: 'Stripe / Razorpay checkout, recurring subscriptions, automated invoicing.',
    category: 'Commerce',
    icon: CreditCard,
  },
  {
    id: 'APIs',
    title: 'REST / GraphQL APIs',
    description: 'Secure, documented REST or GraphQL endpoints with rate limiting and webhooks.',
    category: 'Infrastructure',
    icon: Webhook,
  },
  {
    id: 'AI Chatbot',
    title: 'AI Chatbot & Assistant',
    description: 'Context-aware AI conversational bot with custom company knowledge base (RAG).',
    category: 'AI & Data',
    icon: Bot,
  },
  {
    id: 'Analytics',
    title: 'Product Analytics & Tracking',
    description: 'User behavioral analytics, funnel conversion tracking, and session telemetry.',
    category: 'AI & Data',
    icon: LineChart,
  },
  {
    id: 'Integrations',
    title: 'Third-party Integrations',
    description: 'Sync with Slack, WhatsApp API, HubSpot, Salesforce, Zapier, or Notion.',
    category: 'Infrastructure',
    icon: Layers,
  },
  {
    id: 'Real-time Notifications',
    title: 'Real-time Notifications',
    description: 'Instant WebSocket live alerts, email transaction triggers, and push notifications.',
    category: 'Core Experience',
    icon: Bell,
  },
  {
    id: 'Cloud File Storage',
    title: 'Cloud File Storage & CDN',
    description: 'Scalable asset management using AWS S3 / Cloudinary with secure presigned URLs.',
    category: 'Infrastructure',
    icon: HardDrive,
  },
  {
    id: 'Multi-language (i18n)',
    title: 'Multi-language Support',
    description: 'Localization and multi-currency formatting for global audience accessibility.',
    category: 'Core Experience',
    icon: Globe2,
  },
];

export const Step2Features = () => {
  const { formData, toggleFeature, updateFormData } = useWizard();
  const [customInput, setCustomInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Core Experience', 'Security & Access', 'Commerce', 'AI & Data', 'Infrastructure'];

  const filteredFeatures =
    activeCategory === 'All'
      ? availableFeatures
      : availableFeatures.filter((f) => f.category === activeCategory);

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      updateFormData({ features: [...formData.features, trimmed] });
      setCustomInput('');
    }
  };

  const removeCustomFeature = (name) => {
    updateFormData({ features: formData.features.filter((f) => f !== name) });
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="indigo" size="sm">Phase 02</Badge>
            <span className="text-xs font-mono text-slate-400">FEATURE MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Which features does your product require?
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Select the modules you need. You can pick multiple features and add custom capabilities.
          </p>
        </div>

        {/* Selected count pill */}
        <div className="shrink-0 flex items-center gap-2">
          <Badge
            variant={formData.features.length > 0 ? 'emerald' : 'default'}
            size="md"
            dot={formData.features.length > 0}
          >
            {formData.features.length} Features Selected
          </Badge>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === cat
                ? 'bg-slate-800 text-white font-medium border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredFeatures.map((feat) => {
          const isSelected = formData.features.includes(feat.id);
          const IconComponent = feat.icon;

          return (
            <Card
              key={feat.id}
              interactive
              selected={isSelected}
              onClick={() => toggleFeature(feat.id)}
              className="p-4 flex items-start gap-3.5 text-left cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-glow'
                    : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {feat.title}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {feat.description}
                </p>
                <div className="mt-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {feat.category}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Feature Add Input */}
      <div className="pt-2">
        <form onSubmit={handleAddCustom} className="flex items-center gap-2 max-w-lg">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Add custom feature (e.g. Smart Contract, OCR Scanner)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </form>

        {/* Selected Custom Tags Display */}
        {formData.features.some((f) => !availableFeatures.some((af) => af.id === f)) && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs text-slate-400">Custom features:</span>
            {formData.features
              .filter((f) => !availableFeatures.some((af) => af.id === f))
              .map((custom) => (
                <span
                  key={custom}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-950 text-indigo-300 border border-indigo-700/60"
                >
                  {custom}
                  <button
                    type="button"
                    onClick={() => removeCustomFeature(custom)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Features;
