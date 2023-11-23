import { TextField } from './TextField';
import { FormEvent } from 'react';

type Control = {
  id: string;
  element: React.ElementType;
  commentOptions?: {
    required: boolean;
    title: string;
    placeholder: string;
  }
}

interface IFeedbackProps {
  title: string;
  controls: Control[];
  onSubmit: (e: FormEvent) => void;
}

export function Feedback({ title, controls, onSubmit }: IFeedbackProps) {
  return (
    <form className="feedback" onSubmit={onSubmit}>
      <div className="reaction">
        <h3 className="feedback__title">{title}</h3>
        <div className="reaction-btns">
        {controls.map((control: Control) => {
          const Control = control.element;
          return <Control key={control.id} />;
        })}
        </div>
      </div>
      <TextField />
      <button type="submit" className="feedback__submit-btn">Submit</button>
    </form>
  );
}
