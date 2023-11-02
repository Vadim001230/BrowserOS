import FeedbackComponent from './components/feedback.js'
import UIButton from './UI/button.js';

const feedback = document.getElementById('feedback');

const feedbackComponent = FeedbackComponent({
  title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  onSubmit: async (e, form) => {
    e.preventDefault();
    const formData = new FormData(form);
    for (let key of formData.keys()) {
      console.log(`${key}: ${formData.get(key)}`);
    }
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
