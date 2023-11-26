import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';

export interface CommentOptions extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
}

interface Props extends CommentOptions {
  value: string;
  onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextField({ onInput, onChange, ...props }: Props) {
  const textareaRef = useAutoResizeTextarea();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInput?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
  };

  return (
    <div className="container">
      <p>{props.title}</p>
      <textarea
        className="textarea"
        ref={textareaRef}
        onInput={handleInput}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
