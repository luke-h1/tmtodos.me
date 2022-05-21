import { InputHTMLAttributes, ReactNode } from 'react';

export type TextInputTypes = 'email' | 'password' | 'search' | 'text' | 'url';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: TextInputTypes;
  label?: ReactNode;
  value?: string;
  id: string;
  testId?: string;
  ariaLabel: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
