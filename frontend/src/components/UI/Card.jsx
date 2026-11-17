import React from 'react';

export const Card = ({
  children,
  className = '',
  interactive = false,
  selected = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border transition-all duration-200 ${
        selected
          ? 'bg-[#131D35] border-indigo-500 shadow-glow'
          : interactive
          ? 'bg-[#0F172A]/80 border-slate-800 hover:border-slate-700 hover:bg-[#131E33] cursor-pointer'
          : 'bg-[#0F172A]/80 border-slate-800'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
