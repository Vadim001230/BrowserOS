import { Feedback } from '../components/Feedback';
import { LikeBtn } from '../components/LikeBtn';
import { DislikeBtn } from '../components/DislikeBtn';
import { FormEvent } from 'react';


export function SimpleFeedback() {
  const feedbackOptions = {
    title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
    onSubmit: (e: FormEvent) => {
      e.preventDefault();
    },
    controls: [
      {
        id: 'like',
        element: LikeBtn,
        commentOptions: {
          required: true,
          title: 'Why did you selected useful?',
          placeholder: 'Your feedback...',
        },
      },
      {
        id: 'dislike',
        element: DislikeBtn,
        commentOptions: {
          required: false,
          title: 'Why did you selected not useful?',
          placeholder: 'Write here...',
        },
      },
    ]
  };

  return (
    <div className='feedback-root'>
      {Feedback(feedbackOptions)}
    </div>
  );
}