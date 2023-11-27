import { useTextareaResize } from '@/hooks/useAutoResizeTextarea';
import { RequireAtLeastOneOfKeys } from '@/types/requireAtLeastOneOfKeys';

export interface CommentOptions extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
}

interface Props extends CommentOptions {
  value: string;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextField = ({ title, onInput, onChange, ...props }: RequireAtLeastOneOfKeys<Props, 'onInput' | 'onChange'>) => {
  const { ref } = useTextareaResize();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInput?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
  };

  return (
    <div className="container">
      <p>{title}</p>
      <textarea
        className="textarea"
        ref={ref}
        onInput={handleInput}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
