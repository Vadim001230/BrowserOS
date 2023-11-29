import '@testing-library/jest-dom';
import { useState } from 'react';
import { render, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { FeedbackComponent, Control } from '@/components/Feedback/Feedback';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface LikeButtonProps extends Omit<BaseButtonProps, 'children'> { }

export const LikeButton = ({ ...args }: LikeButtonProps) => (
  <BaseButton {...args} className={`like-button ${args.className || ''}`} data-testid='like-button'>
    <span>Like</span>
  </BaseButton>
);

const title = 'Test Title';
const onSubmit = jest.fn().mockRejectedValue(new Error('Async error message'));
const options = {
  required: true,
  title: 'Test subtitle',
  placeholder: 'Test placeholder',
};
const controls = [
  {
    id: 'like',
    component: LikeButton,
    commentOptions: options,
  },
];

let feedback: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;

const renderFeedbackComponent = (controls: Control[]) => {
  return render(<FeedbackComponent title={title} onSubmit={onSubmit} controls={controls} />);
}

const likeButtonClickEvent = () => fireEvent.click(feedback.getByTestId('like-button'));

const textareaInputEvent = () => fireEvent.input(feedback.getByTestId('text__field'), { target: { value: 'test text' } });

const submitEvent = () => fireEvent.click(feedback.getByTestId('feedback__submit-btn'));

const isSubmitBtnEnabled = () => expect(feedback.getByTestId('feedback__submit-btn')).not.toBeDisabled();
const isSubmitBtnDisabled = () => expect(feedback.getByTestId('feedback__submit-btn')).toBeDisabled();

const testCheckCommentPlaceholder = () => {
  test('textarea содержит переданный placeholder', () => {
    const textarea = feedback.getByTestId('text__field');
    expect(textarea).toHaveAttribute('placeholder', options.placeholder);
  });
}

const testCheckCommentTitle = () => {
  test('Текст в заголовке блока комментария соответсвует переданному', () => {
    const subtitle = feedback.getByText(options.title);
    expect(subtitle).toBeInTheDocument();
  });
}

const testCheckErrorMessage = () => {
  test('Проверка наличия сообщения об ошибке после завершения отправки фидбэка с ошибкой', async () => {
    submitEvent();
    await waitFor(() => {
      expect(feedback.getByTestId('feedback__error')).toBeInTheDocument();
    })
  });
}

describe('Тестирование компонента Feedback', () => {
  beforeEach(() => {
    feedback = renderFeedbackComponent(controls);
  })

  test('Компонент создан', () => {
    expect(feedback.getByTestId('feedback')).toBeInTheDocument();
  });

  test('Текст в заголовке соответсвует переданному', () => {
    expect(feedback.getByText(title)).toBeInTheDocument();
  });
});

describe('Поведение компонента когда комментарий обязателен', () => {
  beforeEach(() => {
    feedback = renderFeedbackComponent(controls);
    likeButtonClickEvent();
  })

  testCheckCommentTitle()
  testCheckCommentPlaceholder();

  test('Кнопка submit имеет аттрибут disabled когда поле комментария пустое', () => {
    isSubmitBtnDisabled();
  });

  test('Кнопка submit не имеет аттрибут disabled после ввода комментария', () => {
    textareaInputEvent();
    isSubmitBtnEnabled();
  });

  testCheckErrorMessage()
});

describe('Поведение компонента когда комментарий опционален', () => {
  const controls = [
    {
      id: 'like',
      component: LikeButton,
      commentOptions: {
        required: false,
        title: 'Test subtitle',
        placeholder: 'Test placeholder',
      }
    },
  ];

  beforeEach(() => {
    feedback = renderFeedbackComponent(controls);
    likeButtonClickEvent();
  })

  testCheckCommentTitle()
  testCheckCommentPlaceholder();

  test('Кнопка submit не имеет аттрибут disabled когда поле комментария пустое', () => {
    isSubmitBtnEnabled();
  });

  test('Кнопка submit не имеет аттрибут disabled после ввода комментария', () => {
    textareaInputEvent();
    isSubmitBtnEnabled();
  });

  testCheckErrorMessage();
});

describe('Поведение компонента когда комментарий отсутсвует', () => {
  const controls = [
    {
      id: 'like',
      component: LikeButton,
    },
  ];

  beforeEach(() => {
    feedback = renderFeedbackComponent(controls);
    likeButtonClickEvent();
  })

  test('Кнопка submit не имеет аттрибут disabled', () => {
    isSubmitBtnEnabled();
  });

  test('Поле комментария отсутствует', () => {
    expect(feedback.queryByTestId('text__field')).toBeNull();
  });

  testCheckErrorMessage();
});

describe('Проверка поведения компонента после успешной отправки фидбэка', () => {
  test('Проверка удаления компонента', async () => {
    const WrapperComponent = () => {
      const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
      const handleFeedbackSubmit = () => new Promise((resolve) => resolve(true)).then(() => setIsSuccessfulSubmit(true));

      return (
        <div>
          {!isSuccessfulSubmit && (
            <FeedbackComponent title={title} onSubmit={handleFeedbackSubmit} controls={controls} />
          )}
        </div>
      );
    };

    render(<WrapperComponent />);
    likeButtonClickEvent();
    textareaInputEvent();
    submitEvent();

    await waitFor(() => {
      expect(feedback.queryByTestId('feedback')).toBeNull();
    });
  });
});
