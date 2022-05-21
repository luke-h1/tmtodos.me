import { ForwardRefComponent, HTMLMotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

export type MainButtonVariant = 'primary' | 'secondary';
export type IconButtonVariant = 'icon';

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  as?: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<'button'>>;
  type?: 'button' | 'submit' | 'reset';
}

interface MainButtonProps extends BaseButtonProps {
  variant: MainButtonVariant;
  icon?: never;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

interface IconButtonProps extends BaseButtonProps {
  variant: IconButtonVariant;
  icon: ReactNode;
  startIcon?: never;
  endIcon?: never;
}

export type ButtonProps<T> = (MainButtonProps | IconButtonProps) & T;
