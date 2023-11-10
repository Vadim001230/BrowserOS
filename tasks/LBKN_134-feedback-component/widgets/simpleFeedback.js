import FeedbackComponent from '../components/feedback.js'
import LikeButton from '../components/likeButton.js';
import DislikeButton from '../components/dislikeButton.js';
import UIComponent from '../UI/UIComponent.js';

const SimpleFeedback = (handleSubmit, resolve) => FeedbackComponent({
  title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  onSubmit: async (e) => {
    await handleSubmit(e);
    resolve(e);
  },
  controls: [
    {
      element: LikeButton,
      commentOptions: {
        required: true,
        subtitle: 'Why did you selected useful?',
        placeholder: 'Your feedback...',
      },
    },
    {
      element: DislikeButton,
      commentOptions: {
        required: false,
        subtitle: 'Why did you selected not useful?',
        placeholder: 'Write here...',
      },
    },
  ]
})

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('url', {
    method: 'POST',
    body: new FormData(e.target.form),
  });
  await response.json();
}

const createSuccessElement = (e) => {
  const form = e.target.form;
  const successElement = UIComponent({
    tag: 'span',
    children: ['Feedback sent successfully!'],
    style: 'color: green',
  })
  form.after(successElement);
  form.remove();
}

const SimpleFeedbackComponent = SimpleFeedback(handleSubmit, createSuccessElement);

export default SimpleFeedbackComponent;
