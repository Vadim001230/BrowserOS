import { Feedback } from '../components/Feedback';
import { LikeBtn } from '../components/LikeBtn';
import { DislikeBtn } from '../components/DislikeBtn';
import { FormEvent } from 'react';
import './style.css';

interface Data {
  reaction: string;
  comment: string;
}

const handleSubmit = async (e: FormEvent, data: Data) => {
  e.preventDefault();
  const response = await fetch('url', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  await response.json();
};

export function SimpleFeedback() {
  const feedbackOptions = {
    title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
    onSubmit: async (e: FormEvent, data: Data) => {
      e.preventDefault();
      await handleSubmit(e, data);
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
