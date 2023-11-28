import { useState } from 'react';
import { FeedbackComponent, OnSubmit } from '@/components/Feedback/Feedback';
import { LikeButton } from '@/components/UI/LikeButton/LikeButton';
import { DislikeButton } from '@/components/UI/DislikeButton/DislikeButton';
import '@/widgets/SimpleFeedback/SimpleFeedbackWidget.css';

const feedbackControls = [
  {
    id: 'like',
    component: LikeButton,
    commentOptions: {
      required: true,
      title: 'Why did you selected useful?',
      placeholder: 'Your feedback...',
    },
  },
  {
    id: 'dislike',
    component: DislikeButton,
    commentOptions: {
      required: false,
      title: 'Why did you selected not useful?',
      placeholder: 'Write here...',
    },
  },
];

export const SimpleFeedbackWidget = () => {
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const handleFeedbackSubmit: OnSubmit = (data) => {
    return fetch('url', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => response.json())
      .then(() => setIsSuccessfulSubmit(true))
  };

  const feedbackOptions = {
    title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
    onSubmit: handleFeedbackSubmit,
    controls: feedbackControls,
  };

  return (
    <div className='simple-feedback'>
      {!isSuccessfulSubmit && (
        <FeedbackComponent {...feedbackOptions} />
      )}
    </div>
  );
};
