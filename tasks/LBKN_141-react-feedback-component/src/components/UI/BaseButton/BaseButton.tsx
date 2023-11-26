import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isChecked: boolean;
}

export const BaseButton = ({ children, isChecked, ...attributes }: BaseButtonProps) => {
  return (
    <button
      type="button"
      {...attributes}
      className={`button ${attributes.className || ''} ${isChecked ? 'checked' : ''} `}
    >
      {children}
    </button>
  );
};
