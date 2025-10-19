import React from 'react';
import { Input, Label } from '../atoms';
import type { InputProps, LabelProps } from '../atoms';

export interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  inputProps?: Omit<InputProps, 'id'>;
  labelProps?: Omit<LabelProps, 'htmlFor' | 'children'>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  required = false,
  inputProps,
  labelProps,
}) => {
  return (
    <div className="mb-4">
      <Label
        htmlFor={id}
        required={required}
        {...labelProps}
      >
        {label}
      </Label>
      <div className="mt-1">
        <Input
          id={id}
          required={required}
          {...inputProps}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;