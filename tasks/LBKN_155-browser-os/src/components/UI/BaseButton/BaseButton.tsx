import { ButtonHTMLAttributes, ReactNode } from 'react';
import './BaseButton.scss';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const BaseButton = ({ children, type = 'button', ...attributes }: BaseButtonProps) => {
  return (
    <button
      type={type}
      {...attributes}
      className={`button ${attributes.className || ''}`}
    >
      {children}
    </button>
  );
};
