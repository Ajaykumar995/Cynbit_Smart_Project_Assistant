import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Button from '../components/UI/Button';

export const NotFoundPage = () => {
  return (
    <div className="py-24 px-4 text-center space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-indigo-400 mx-auto flex items-center justify-center">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">404 - Page Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested page could not be located in the Cynbit project scoping portal.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary" size="md" leftIcon={ArrowLeft}>
          Return to Overview
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
