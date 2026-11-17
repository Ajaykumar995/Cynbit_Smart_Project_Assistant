import React from 'react';
import { User, Mail, Phone, Building, MessageSquare, Video, ShieldCheck } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

export const Step5Contact = () => {
  const { formData, updateFormData, updateContact } = useWizard();
  const { contact, description } = formData;

  const contactMethods = [
    { id: 'Email', label: 'Email', icon: Mail },
    { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'Google Meet', label: 'Google Meet', icon: Video },
    { id: 'Phone Call', label: 'Phone Call', icon: Phone },
  ];

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Phase 05</Badge>
          <span className="text-xs font-mono text-slate-400">CONTACT & PROJECT CONTEXT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How should our engineering team reach you?
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Share your contact details and optional context about your vision. We keep your information strictly confidential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form Fields */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={contact.name || ''}
                  onChange={(e) => updateContact({ name: e.target.value })}
                  placeholder="e.g. Alex Sharma"
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Work / Personal Email <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={contact.email || ''}
                  onChange={(e) => updateContact({ email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Phone / WhatsApp <span className="text-slate-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={contact.phone || ''}
                  onChange={(e) => updateContact({ phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Company / Brand Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Company / Project Name <span className="text-slate-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={contact.company || ''}
                  onChange={(e) => updateContact({ company: e.target.value })}
                  placeholder="Acme Innovations"
                  className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Preferred Communication Channel */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Preferred Discussion Channel
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {contactMethods.map((method) => {
                const isSelected = (contact.preferredContact || 'Email') === method.id;
                const IconComp = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => updateContact({ preferredContact: method.id })}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                        : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Description Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Project Overview & Core Requirements
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {(description || '').length} / 3000 chars
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={3000}
              value={description || ''}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Tell us about the problem your product solves, target users, any benchmark references (e.g. 'Like Stripe dashboard meets Notion')..."
              className="w-full bg-[#0F172A] border border-slate-800 rounded-lg p-3 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y leading-relaxed"
            />
          </div>
        </div>

        {/* Side Privacy & Guarantee Card */}
        <div className="space-y-4">
          <Card className="p-4 bg-slate-900/60 border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Cynbit NDA & Privacy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All project submissions are strictly confidential. We never share proprietary specifications, product concepts, or contact details with any third parties.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Response within 24 business hours</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Direct technical architect review</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step5Contact;
