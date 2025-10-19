import React from 'react';

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  required = false,
  className = '',
}) => {
  const baseClasses = 'block text-sm font-medium text-gray-700';
  const classes = `${baseClasses} ${className}`;

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;