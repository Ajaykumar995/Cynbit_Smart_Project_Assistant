import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useWizard } from '../context/WizardContext';

const steps = [
  { id: 1, name: 'Project Type', short: 'Type' },
  { id: 2, name: 'Features', short: 'Features' },
  { id: 3, name: 'Budget', short: 'Budget' },
  { id: 4, name: 'Timeline', short: 'Timeline' },
  { id: 5, name: 'Contact Details', short: 'Contact' },
  { id: 6, name: 'Review Brief', short: 'Review' },
];

export const StepIndicator = () => {
  const { currentStep, goToStep } = useWizard();

  const progressPercentage = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full mb-8">
      {/* Top Progress Track */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
        <span className="flex items-center gap-1.5 font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          STEP {currentStep} OF {steps.length}
        </span>
        <span className="text-indigo-400 font-semibold">{progressPercentage}% COMPLETED</span>
      </div>

      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Desktop Step Buttons Grid */}
      <nav aria-label="Progress" className="hidden sm:block">
        <ol className="flex items-center justify-between border border-slate-800/80 bg-[#0F172A]/70 rounded-xl p-2 backdrop-blur-sm">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isPending = step.id > currentStep;

            return (
              <li key={step.name} className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    // Only allow navigating backwards or to current
                    if (step.id <= currentStep) {
                      goToStep(step.id);
                    }
                  }}
                  disabled={isPending}
                  className={`w-full group flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    isCurrent
                      ? 'bg-indigo-600/15 border border-indigo-500/40 text-white shadow-sm'
                      : isCompleted
                      ? 'hover:bg-slate-800/60 text-slate-300 cursor-pointer'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-glow'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs font-medium truncate ${
                        isCurrent
                          ? 'text-indigo-300 font-semibold'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile Step Header */}
      <div className="sm:hidden flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            {currentStep}
          </div>
          <div>
            <div className="text-xs text-slate-400">Current Phase</div>
            <div className="text-sm font-semibold text-white">
              {steps[currentStep - 1]?.name}
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400">
          Next: {steps[currentStep]?.short || 'Submission'}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
