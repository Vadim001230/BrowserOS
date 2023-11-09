import FeedbackComponent from '../components/feedback.js'
import LikeButton from '../components/likeButton.js';
import DislikeButton from '../components/dislikeButton.js';

const SimpleFeedback = FeedbackComponent({
  title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  onSubmit: (e, form) => {
    e.preventDefault();
    return fetch('url', {
      method: 'POST',
      body: new FormData(form)
    }).then((response) => response.json())
      .then(() => {
        const span = document.createElement('span');
        span.textContent = 'Feedback sent successfully!';
        span.style.color = 'green';
        form.after(span);
        form.remove();
      });
  },
  controls: [
    {
      btn: LikeButton,
      commentOptions: {
        required: true,
        subtitle: 'Why did you selected useful?',
        placeholder: 'Your feedback...',
      },
    },
    {
      btn: DislikeButton,
      commentOptions: {
        required: false,
        subtitle: 'Why did you selected not useful?',
        placeholder: 'Write here...',
      },
    },
  ]
})

export default SimpleFeedback;
