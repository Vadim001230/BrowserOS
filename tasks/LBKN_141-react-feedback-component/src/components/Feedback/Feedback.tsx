import { useMemo, useState } from 'react';
import { TextField, CommentOptions } from '../UI/TextField/TextField';

interface Control {
  id: string | number;
  element: React.ElementType;
  commentOptions?: CommentOptions;
}

interface Props {
  title: string;
  controls: Control[];
  onSubmit: (data: { reaction: string; comment: string }) => Promise<unknown>;
}

export function FeedbackComponent({ title, controls, onSubmit }: Props) {
  const [comment, setComment] = useState('');
  const [reaction, setReaction] = useState('');
  const [isShownError, setIsShownError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentCommentOptions = useMemo(
    () => controls.find((control) => control.id === reaction)?.commentOptions,
    [reaction, controls]
  );


  const handleReactionClick = (controlId: Control['id']) => {
    if (controlId !== reaction) {
      setReaction(controlId.toString());
      setComment('');
      if (isShownError) setIsShownError(false);
    }
  };

  const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (isShownError) setIsShownError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ reaction, comment });
      setIsSubmitted(true);
    } catch (error) {
      setIsShownError(true);
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <div className="feedback__container">
        <h3 className="feedback__title">{title}</h3>
        <div className="feedback__controls">
          {controls.map(({ id, element: Control }) => (
            <Control
              key={id}
              isChecked={reaction === id}
              onClick={() => handleReactionClick(id)}
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
        {isShownError && <span style={{ color: 'red' }}>An error has occurred. Try again</span>}
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
