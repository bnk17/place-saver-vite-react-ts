import React from 'react';
import { cn } from '../../utils/Helpers';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  buttonRef?: React.Ref<HTMLButtonElement> | undefined;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariants = {
  primary: 'bg-blue-600 text-white focus:outline-blue-200',
  secondary: 'bg-[#F1F0F0] text-black focus:outline-gray-200',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  buttonRef,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      ref={buttonRef}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium focus:outline-3  disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
