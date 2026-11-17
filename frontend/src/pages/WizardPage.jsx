import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';
import { useWizard } from '../context/WizardContext';
import StepIndicator from '../components/StepIndicator';
import Step1ProjectType from '../components/WizardSteps/Step1ProjectType';
import Step2Features from '../components/WizardSteps/Step2Features';
import Step3Budget from '../components/WizardSteps/Step3Budget';
import Step4Timeline from '../components/WizardSteps/Step4Timeline';
import Step5Contact from '../components/WizardSteps/Step5Contact';
import Step6Review from '../components/WizardSteps/Step6Review';
import Button from '../components/UI/Button';

export const WizardPage = () => {
  const { currentStep, nextStep, prevStep, resetWizard } = useWizard();
  const [stepError, setStepError] = useState(null);

  const handleNext = () => {
    setStepError(null);
    const result = nextStep();
    if (!result.success) {
      setStepError(result.error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProjectType />;
      case 2:
        return <Step2Features />;
      case 3:
        return <Step3Budget />;
      case 4:
        return <Step4Timeline />;
      case 5:
        return <Step5Contact />;
      case 6:
        return <Step6Review />;
      default:
        return <Step1ProjectType />;
    }
  };

  const stepNextLabels = {
    1: 'Continue to Features',
    2: 'Continue to Budget',
    3: 'Continue to Timeline',
    4: 'Continue to Contact Details',
    5: 'Review Project Brief',
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all responses?')) {
              resetWizard();
            }
          }}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Draft</span>
        </button>
      </div>

      {/* Progress Step Indicator */}
      <StepIndicator />

      {/* Inline Validation Alert */}
      {stepError && (
        <div className="mb-6 p-3.5 rounded-lg bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{stepError}</span>
        </div>
      )}

      {/* Dynamic Step Content */}
      <div className="min-h-[460px]">{renderStep()}</div>

      {/* Bottom Step Navigation Bar (Steps 1 to 5) */}
      {currentStep < 6 && (
        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setStepError(null);
              prevStep();
            }}
            disabled={currentStep === 1}
            leftIcon={ArrowLeft}
          >
            Previous
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={ArrowRight}
            className="shadow-glow"
          >
            {stepNextLabels[currentStep] || 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WizardPage;
