import React from 'react';
import {
  FileText,
  Edit2,
  Cpu,
  Layers,
  Clock,
  IndianRupee,
  User,
  Mail,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

export const Step6Review = () => {
  const {
    formData,
    goToStep,
    isSubmitting,
    submitError,
    submitInquiry,
    getEstimatedScope,
  } = useWizard();

  const { projectType, features, budget, timeline, contact, description } = formData;
  const estimatedScope = getEstimatedScope();

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="emerald" size="sm" dot>Phase 06</Badge>
          <span className="text-xs font-mono text-slate-400">FINAL BRIEF GENERATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Review Your Generated Project Brief
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Review the synthesized specifications and estimated scope below before final submission.
        </p>
      </div>

      {/* Submission Error Banner */}
      {submitError && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold block mb-0.5">Submission Error</span>
            {submitError}
          </div>
        </div>
      )}

      {/* Intelligent Architecture & Scope Banner */}
      <Card className="p-5 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/30 border-indigo-500/30">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Intelligent Scope & Architecture Blueprint
              </h3>
              <p className="text-xs text-slate-400">
                Generated automatically based on your selected parameters
              </p>
            </div>
          </div>
          <Badge variant="indigo" size="md">
            {estimatedScope.complexity}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Estimated Engineering Effort</span>
            <span className="text-sm font-mono font-semibold text-white">
              {estimatedScope.hours}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs text-slate-400 block mb-1.5">Recommended Tech Stack</span>
            <div className="flex flex-wrap gap-1.5">
              {estimatedScope.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-indigo-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Review Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Type Card */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Project Category
              </span>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="text-base font-semibold text-white">
              {projectType || 'Not specified'}
            </div>
          </div>
        </Card>

        {/* Budget & Timeline Card */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Budget & Schedule
              </span>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Budget:</span>
                <span className="font-semibold text-white font-mono">{budget || 'Undecided'}</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-xs text-slate-400 block">Timeline:</span>
                <span className="font-semibold text-white">{timeline || 'Not specified'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Features Selected Card */}
        <Card className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Selected Feature Modules ({features?.length || 0})
            </span>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
          </div>
          {features && features.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {features.map((feature) => (
                <Badge key={feature} variant="default" size="sm">
                  {feature}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-xs text-amber-400">No features selected yet.</span>
          )}
        </Card>

        {/* Contact Information Card */}
        <Card className="p-4 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              Client Contact Information
            </span>
            <button
              type="button"
              onClick={() => goToStep(5)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Name</span>
              <span className="text-white font-medium text-sm">{contact.name || '—'}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Email</span>
              <span className="text-white font-medium text-sm">{contact.email || '—'}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Phone / Channel</span>
              <span className="text-white font-medium text-sm">
                {contact.phone || 'N/A'} ({contact.preferredContact || 'Email'})
              </span>
            </div>
          </div>

          {description && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Project Description & Scope Notes:</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800">
                {description}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Submission CTA Box */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs text-slate-400">
            By submitting, you initiate an automated technical scoping pipeline.
            A Cynbit tech lead will review your brief within <strong className="text-slate-200">24 hours</strong>.
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={submitInquiry}
          isLoading={isSubmitting}
          rightIcon={Send}
          className="w-full sm:w-auto shadow-glow shrink-0"
        >
          Submit Project Inquiry
        </Button>
      </div>
    </div>
  );
};

export default Step6Review;
