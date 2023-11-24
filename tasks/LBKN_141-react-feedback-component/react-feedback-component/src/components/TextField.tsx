import { fixTextareaHeight } from '../utils/textarea';

interface TextFieldProps {
  options: {
    required: boolean;
    title: string;
    placeholder: string;
  }
  value: string;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextField({ options, value, onInput }: TextFieldProps) {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    fixTextareaHeight(e.target);
    onInput(e);
  };

  return (
    <div className="comment-container">
      <p>{options.title}</p>
      <textarea
        className="textarea"
        placeholder={options.placeholder}
        required={options.required}
        value={value}
        onInput={handleInput}
      />
    </div>
  );
}
