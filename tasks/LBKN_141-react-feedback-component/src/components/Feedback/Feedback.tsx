import { useMemo, useState } from 'react';
import { TextField, CommentOptions } from '@/components/UI/TextField/TextField';

interface Control {
  id: string | number;
  component: React.ElementType;
  commentOptions?: CommentOptions;
}

export type OnSubmit = (data: { reaction: Control['id'], comment: string }) => Promise<unknown>;

interface Props {
  title: string;
  controls: Control[];
  onSubmit: OnSubmit;
}

export function FeedbackComponent({ title, controls, onSubmit }: Props) {
  const [comment, setComment] = useState('');
  const [reaction, setReaction] = useState<number | string>('');
  const [isErrorShown, setIsErrorShown] = useState(false);
  const currentCommentOptions = useMemo(
    () => controls.find(({ id }) => id === reaction)?.commentOptions,
    [reaction, controls]
  );

  const hideError = () => {
    if (isErrorShown) {
      setIsErrorShown(false);
    }
  };

  const handleReactionClick = (controlId: Control['id']) => {
    if (controlId !== reaction) {
      setReaction(controlId);
      setComment('');
      hideError();
    }
  };

  const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    hideError();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reaction, comment }).catch(() => setIsErrorShown(true))
  };

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <div className="feedback__container">
        <h3 className="feedback__title">{title}</h3>
        <div className="feedback__controls">
          {controls.map(({ id, component: Control }) => (
            <Control
              key={id}
              isChecked={reaction === id}
              onClick={handleReactionClick.bind(null, id)}
            />
          ))}
        </div>
      </div>
      {currentCommentOptions && (
        <TextField
          {...currentCommentOptions}
          onInput={handleCommentInput}
          value={comment}
        />
      )}
      <div className="container">
        {isErrorShown && <span className="feedback__error">An error has occurred. Try again</span>}
      </div>
      <div className="container">
        {reaction && (
          <button
            type="submit"
            className="feedback__submit-btn"
            disabled={currentCommentOptions?.required && !comment}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
