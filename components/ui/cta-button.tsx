import React from 'react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export function CTAButton({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '' 
}: CTAButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
} 