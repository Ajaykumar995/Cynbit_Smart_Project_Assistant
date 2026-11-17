import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inquiryService } from '../services/api';

const WizardContext = createContext();

const STORAGE_KEY = 'cynbit_wizard_draft';

const initialFormData = {
  projectType: '',
  features: [],
  budget: '',
  timeline: '',
  contact: {
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredContact: 'Email',
  },
  description: '',
};

export const WizardProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load draft from localStorage if available
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse wizard draft', e);
    }
    return initialFormData;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  // Sync draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Failed to save wizard draft', e);
    }
  }, [formData]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  const updateContact = (contactFields) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contactFields,
      },
    }));
  };

  const toggleFeature = (featureName) => {
    setFormData((prev) => {
      const exists = prev.features.includes(featureName);
      const updated = exists
        ? prev.features.filter((f) => f !== featureName)
        : [...prev.features, featureName];
      return { ...prev, features: updated };
    });
  };

  // Validation per step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.projectType) return 'Please select a project type to continue.';
        return null;
      case 2:
        if (!formData.features || formData.features.length === 0) {
          return 'Please select at least one core feature for your project.';
        }
        return null;
      case 3:
        if (!formData.budget) return 'Please select an estimated budget bracket.';
        return null;
      case 4:
        if (!formData.timeline) return 'Please select your target project timeline.';
        return null;
      case 5:
        if (!formData.contact.name?.trim()) return 'Please enter your full name.';
        if (!formData.contact.email?.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contact.email.trim())) {
          return 'Please enter a valid email address.';
        }
        return null;
      default:
        return null;
    }
  };

  const nextStep = () => {
    const error = validateStep(currentStep);
    if (error) {
      return { success: false, error };
    }
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return { success: true };
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 6) {
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetWizard = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setSubmitError(null);
    setSubmittedData(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Live client-side estimated scope calculation
  const getEstimatedScope = () => {
    const { projectType, features, budget } = formData;
    const count = features.length;

    let complexity = 'Moderate Prototype';
    let hours = '80 - 130 Hours';
    let stack = ['React.js', 'Node.js', 'Express', 'MongoDB'];

    if (projectType === 'AI Automation') {
      complexity = 'High / AI Architecture';
      hours = '160 - 240 Hours';
      stack = ['FastAPI / Python', 'LangChain', 'Vector DB', 'React.js'];
    } else if (projectType === 'Mobile App') {
      complexity = 'Cross-Platform Mobile';
      hours = '140 - 200 Hours';
      stack = ['React Native / Flutter', 'Node.js API', 'MongoDB Atlas'];
    } else if (projectType === 'SaaS') {
      complexity = 'Scalable SaaS Architecture';
      hours = '180 - 280 Hours';
      stack = ['Next.js / React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'];
    }

    if (count >= 6 || budget?.includes('2L') || budget?.includes('3L')) {
      complexity = 'Enterprise Grade';
      hours = '220 - 350 Hours';
    }

    return { complexity, hours, stack };
  };

  // Submit inquiry to backend API
  const submitInquiry = async () => {
    // Validate final step before submission
    const step5Error = validateStep(5);
    if (step5Error) {
      setSubmitError(step5Error);
      goToStep(5);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await inquiryService.create(formData);
      
      if (response.success && response.data) {
        setSubmittedData(response.data);
        // Clear local storage draft
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
          // ignore
        }
        // Navigate to success page with reference ID
        navigate(`/success/${response.data.referenceId}`, {
          state: { inquiry: response.data },
        });
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit inquiry. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WizardContext.Provider
      value={{
        formData,
        currentStep,
        isSubmitting,
        submitError,
        submittedData,
        updateFormData,
        updateContact,
        toggleFeature,
        validateStep,
        nextStep,
        prevStep,
        goToStep,
        resetWizard,
        submitInquiry,
        getEstimatedScope,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
