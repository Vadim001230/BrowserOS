import { TextField } from './TextField';
import { useState } from 'react';

interface CommentOptions {
  required: boolean;
  title: string;
  placeholder: string;
}

interface Control {
  id: string;
  element: React.ElementType;
  commentOptions?: CommentOptions;
}

interface FeedbackProps {
  title: string;
  controls: Control[];
  onSubmit: (e: React.FormEvent, data: { reaction: string; comment: string }) => Promise<void>;
}

export function Feedback({ title, controls, onSubmit }: FeedbackProps) {
  const [comment, setComment] = useState('');
  const [reaction, setReaction] = useState('');
  const [currentCommentOptions, setCurrentCommentOptions] = useState<CommentOptions | undefined>();
  const [isError, setIsError] = useState(false);

  const handleReactionClick = (controlId: string, options: CommentOptions | undefined) => {
    if (controlId !== reaction) {
      setReaction(controlId);
      setComment('');
      setCurrentCommentOptions(options);
      if (isError) setIsError(false);
    }
  };

  const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if(isError) setIsError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    onSubmit(e, { reaction, comment }).catch(() => {
      setIsError(true);
    });
  };

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <div className="reaction">
        <h3 className="feedback__title">{title}</h3>
        <div className="reaction-btns">
          {controls.map((control: Control) => {
            const Control = control.element;
            return (
              <Control
                key={control.id}
                checked={reaction === control.id}
                onClick={() => handleReactionClick(control.id, control.commentOptions)}
              />
            );
          })}
        </div>
      </div>
      {currentCommentOptions && (
        <TextField
          options={currentCommentOptions}
          onInput={handleCommentInput}
          value={comment}
        />
      )}
      {isError && <span style={{ color: 'red' }}>An error has occurred. Try again</span>}
      {reaction && (
        <button
          type="submit"
          className="feedback__submit-btn"
          disabled={currentCommentOptions?.required && !comment}
        >
          Submit
        </button>
      )}
    </form>
  );
}
