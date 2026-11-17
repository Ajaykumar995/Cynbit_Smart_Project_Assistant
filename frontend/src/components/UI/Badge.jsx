import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/80',
    indigo: 'bg-indigo-950/80 text-indigo-300 border border-indigo-700/50',
    cyan: 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/50',
    emerald: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50',
    amber: 'bg-amber-950/80 text-amber-300 border border-amber-700/50',
    purple: 'bg-purple-950/80 text-purple-300 border border-purple-700/50',
    outline: 'bg-transparent text-slate-400 border border-slate-700',
  };

  const dotColors = {
    default: 'bg-slate-400',
    indigo: 'bg-indigo-400',
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    purple: 'bg-purple-400',
    outline: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0 animate-pulse`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
