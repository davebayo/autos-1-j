import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold transition-all duration-200 border border-white/20 hover:border-white/50";

  const variants = {
    primary: "bg-modfem-racingEmerald text-black hover:bg-opacity-90 border-transparent hover:border-transparent",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 p-1 opacity-50">+</div>
      <div className="absolute top-0 right-0 p-1 opacity-50">+</div>
      <div className="absolute bottom-0 left-0 p-1 opacity-50">+</div>
      <div className="absolute bottom-0 right-0 p-1 opacity-50">+</div>

      <span className="relative z-10">{children}</span>
    </button>
  );
}
