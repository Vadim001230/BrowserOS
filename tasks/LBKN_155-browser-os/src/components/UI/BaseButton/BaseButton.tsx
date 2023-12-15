import { ButtonHTMLAttributes, ReactNode } from 'react';
import './BaseButton.scss';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked?: boolean;
  children: ReactNode;
}

export const BaseButton = ({ children, isChecked, type = 'button', ...attributes }: BaseButtonProps) => {
  return (
    <button
      type={type}
      {...attributes}
      className={`button ${isChecked ? 'button_checked' : ''} ${attributes.className || ''}`}
    >
      {children}
    </button>
  );
};
