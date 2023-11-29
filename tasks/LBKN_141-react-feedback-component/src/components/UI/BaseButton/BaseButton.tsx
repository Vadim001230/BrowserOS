import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isChecked: boolean;
}

export const BaseButton = ({ children, isChecked, type = 'button', ...attributes }: BaseButtonProps) => {
  return (
    <button
      type={type}
      {...attributes}
      className={`button ${attributes.className || ''} ${isChecked ? 'checked' : ''}`}
    >
      {children}
    </button>
  );
};
