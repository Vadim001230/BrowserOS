import FeedbackComponent from './components/feedback.js'
import UIButton from './UI/button.js';

const feedback = document.getElementById('feedback');

const feedbackComponent = FeedbackComponent({
  title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  onSubmit: () => console.log('submit!'),
  controls: [
    {
      btn: UIButton('like'),
      commentOptions: {
        required: true,
        subtitle: 'Why did you selected useful?',
        placeholder: 'Your feedback...',
      },
    },
    {
      btn: UIButton('dislike'),
      commentOptions: {
        required: false,
        subtitle: 'Why did you selected not useful?',
        placeholder: '...',
      },
    },
  ]
})

feedback.append(feedbackComponent);
