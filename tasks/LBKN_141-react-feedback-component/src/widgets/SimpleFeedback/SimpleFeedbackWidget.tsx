import { FeedbackComponent } from '@/components/Feedback/Feedback';
import { LikeButton } from '@/components/UI/LikeButton/LikeButton';
import { DislikeButton } from '@/components/UI/DislikeButton/DislikeButton';
import './SimpleFeedbackWidget.css';

const handleSubmit = async (data: { reaction: string; comment: string }) => {
  const response = await fetch('url', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const SimpleFeedbackWidget = () => {
  const feedbackOptions = {
    title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
    onSubmit: handleSubmit,
    controls: [
      {
        id: 'like',
        element: LikeButton,
        commentOptions: {
          required: true,
          title: 'Why did you selected useful?',
          placeholder: 'Your feedback...',
        },
      },
      {
        id: 'dislike',
        element: DislikeButton,
        commentOptions: {
          required: false,
          title: 'Why did you selected not useful?',
          placeholder: 'Write here...',
        },
      },
    ]
  };

  return (
    <div className='feedback-widget'>
      <FeedbackComponent {...feedbackOptions} />
    </div>
  );
};
