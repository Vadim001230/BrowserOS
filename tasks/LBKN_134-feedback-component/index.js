import FeedbackComponent from './components/feedback.js'
import UIButton from './UI/button.js';

const feedback = document.getElementById('feedback');

const feedbackComponent = FeedbackComponent({
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
        element: UIButton('like'),
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
        element: UIButton('dislike'),
        value: 'dislike',
      },
      commentOptions: {
        required: false,
        subtitle: 'Why did you selected not useful?',
        placeholder: '...',
      },
    },
  ]
})

feedback.append(feedbackComponent);
