import React from 'react';
import { motion } from 'framer-motion';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export const designTokens = {
  // Colors
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb', // Main blue
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
    },
    error: {
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
    }
  },
  
  // Typography Scale
  typography: {
    hero: 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight',
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight',
    h2: 'text-xl md:text-2xl lg:text-3xl font-bold leading-tight',
    h3: 'text-lg md:text-xl font-bold',
    body: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm font-medium',
    caption: 'text-xs',
  },
  
  // Spacing
  spacing: {
    section: 'py-16 px-4',
    container: 'max-w-4xl mx-auto',
    containerWide: 'max-w-6xl mx-auto',
    gap: {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }
  },
  
  // Border Radius
  radius: {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-lg',
    md: 'shadow-xl',
    lg: 'shadow-2xl',
  },
  
  // Animations
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    staggerChildren: {
      animate: { transition: { staggerChildren: 0.1 } }
    }
  }
};

// =============================================================================
// UTILITY FUNCTION
// =============================================================================

// Utility function for conditional classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// =============================================================================
// LAYOUT COMPONENTS
// =============================================================================

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'black' | 'blue';
  id?: string;
  ariaLabel?: string;
}

export function Section({ 
  children, 
  className, 
  background = 'white',
  id,
  ariaLabel 
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    black: 'bg-black',
    blue: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
  };

  return (
    <section 
      id={id}
      className={cn(
        designTokens.spacing.section,
        backgroundClasses[background],
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide';
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  const sizeClasses = {
    default: designTokens.spacing.container,
    wide: designTokens.spacing.containerWide
  };

  return (
    <div className={cn(sizeClasses[size], className)}>
      {children}
    </div>
  );
}

// =============================================================================
// TYPOGRAPHY COMPONENTS
// =============================================================================

interface HeadingProps {
  children: React.ReactNode;
  level: 'hero' | 'h1' | 'h2' | 'h3';
  className?: string;
  color?: 'default' | 'white' | 'blue';
  id?: string;
}

export function Heading({ children, level, className, color = 'default', id }: HeadingProps) {
  const colorClasses = {
    default: 'text-gray-900',
    white: 'text-white',
    blue: 'text-blue-600'
  };

  const Component = level === 'hero' ? 'h1' : level;

  return (
    <Component 
      id={id}
      className={cn(
        designTokens.typography[level],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'small' | 'caption';
  className?: string;
  color?: 'default' | 'muted' | 'white' | 'blue';
}

export function Text({ children, variant = 'body', className, color = 'default' }: TextProps) {
  const colorClasses = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    white: 'text-white',
    blue: 'text-blue-600'
  };

  return (
    <p className={cn(
      designTokens.typography[variant],
      colorClasses[color],
      className
    )}>
      {children}
    </p>
  );
}

// =============================================================================
// BUTTON COMPONENTS
// =============================================================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className,
  onClick,
  href,
  disabled = false,
  ariaLabel
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-lg shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-50 text-center whitespace-nowrap';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-300',
    white: 'bg-white hover:bg-gray-50 text-blue-700 border-2 border-white focus:ring-white'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 md:py-4 md:px-8 text-base md:text-lg',
    lg: 'py-4 px-6 md:py-5 md:px-10 text-lg md:text-xl'
  };

  const widthClasses = fullWidth ? 'w-full md:w-auto' : '';
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'active:scale-95';

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    disabledClasses,
    className
  );

  if (href) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

// =============================================================================
// BADGE COMPONENT
// =============================================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'blue', className }: BadgeProps) {
  const variantClasses = {
    blue: 'border-2 border-blue-200 text-blue-700 bg-blue-50',
    dark: 'border-2 border-blue-400 text-blue-400 bg-blue-900/20'
  };

  return (
    <div className={cn(
      'inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold',
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
}

// =============================================================================
// STEP BADGE COMPONENT
// =============================================================================

interface StepBadgeProps {
  step: string;
  title: string;
  variant?: 'blue' | 'dark';
  className?: string;
}

export function StepBadge({ step, title, variant = 'blue', className }: StepBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      <span className="font-mono text-xs font-bold mr-2">{step}</span>
      {title}
    </Badge>
  );
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12'
  };

  const hoverClasses = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';

  return (
    <div className={cn(
      'bg-gray-50 rounded-lg border border-gray-200 shadow-lg',
      paddingClasses[padding],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
}

// =============================================================================
// ANIMATED WRAPPER
// =============================================================================

interface AnimatedProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'stagger';
  delay?: number;
  className?: string;
}

export function Animated({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0,
  className 
}: AnimatedProps) {
  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
      viewport: { once: true }
    },
    stagger: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { staggerChildren: 0.1, delay },
      viewport: { once: true }
    }
  };

  return (
    <motion.div 
      className={className}
      {...animations[animation]}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// LIST COMPONENT
// =============================================================================

interface ListProps {
  items: string[];
  variant?: 'bullet' | 'check';
  color?: 'blue' | 'green' | 'red';
  className?: string;
}

export function List({ items, variant = 'bullet', color = 'blue', className }: ListProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600', 
    red: 'text-red-600'
  };

  const icons = {
    bullet: '•',
    check: '✓'
  };

  return (
    <ul className={cn('space-y-3 pl-6', className)} role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3" role="listitem">
          <span className={cn('font-bold text-lg', colorClasses[color])}>
            {icons[variant]}
          </span>
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// HIGHLIGHT COMPONENT
// =============================================================================

interface HighlightProps {
  children: React.ReactNode;
  variant?: 'blue' | 'yellow' | 'green';
  className?: string;
}

export function Highlight({ children, variant = 'blue', className }: HighlightProps) {
  const variantClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600'
  };

  return (
    <span className={cn(
      'font-bold inline-block px-3 py-1 rounded-md',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
} 