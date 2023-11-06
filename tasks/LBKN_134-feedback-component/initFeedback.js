import FeedbackComponent from './components/feedback.js'
import DislikeButton from './UI/dislikeButton.js';
import LikeButton from './UI/likeButton.js';

const initialFeedback = FeedbackComponent({
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
      btn: {
        element: LikeButton(),
        value: 'like',
      },
      commentOptions: {
        required: true,
        subtitle: 'Why did you selected useful?',
        placeholder: 'Your feedback...',
      },
    },
    {
      btn: {
        element: DislikeButton(),
        value: 'dislike',
      },
      commentOptions: {
        subtitle: 'Why did you selected not useful?',
        placeholder: 'Write here...',
      },
    },
  ]
})

export default initialFeedback;
