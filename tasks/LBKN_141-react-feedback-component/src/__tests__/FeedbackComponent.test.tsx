import '@testing-library/jest-dom';
import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeedbackComponent } from '@/components/Feedback/Feedback';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const LikeButton = ({ ...args }: Props) => (
  <BaseButton {...args} className={`like-button ${args.className || ''}`} data-testid={'like-button'}>
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

describe('Тестирование компонента Feedback', () => {
  beforeEach(() => {
    render(<FeedbackComponent title={title} onSubmit={onSubmit} controls={controls} />);
  })

  test('Проверка создан ли компонент', () => {
    const feedback = screen.getByTestId('feedback');
    expect(feedback).toBeInTheDocument();
  });

  test('Проверка правильности содержимого заголовка', () => {
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  describe('Поведение компонента когда комментарий обязателен', () => {
    test('Поведение правильности содержимого компонента', () => {
      const likeButton = screen.getByTestId('like-button');
      fireEvent.click(likeButton);

      const subtitle = screen.getByText(options.title);
      expect(subtitle).toBeInTheDocument();

      const submitButton = screen.getByText('Submit');
      expect(submitButton).toBeDisabled();

      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', options.placeholder);
    });

    test('Проверка состояния элемента после ввода комментария', () => {
      const likeButton = screen.getByTestId('like-button');
      fireEvent.click(likeButton);

      const textarea = screen.getByRole('textbox');
      fireEvent.input(textarea, { target: { value: 'test text' } });

      const submitButton = screen.getByText('Submit');
      expect(submitButton).not.toBeDisabled();
    });

    test('Проверка наличия сообщения об ошибки после неуспешной отправки фидбэка', async () => {
      const likeButton = screen.getByTestId('like-button');
      fireEvent.click(likeButton);

      const textarea = screen.getByRole('textbox');
      fireEvent.input(textarea, { target: { value: 'test text' } });

      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);

      const errorText = await screen.findByTestId('error-text');
      expect(errorText).toBeInTheDocument();
    });
  });
});

describe('Поведение компонента когда комментарий опционален', () => {
  const options = {
    required: false,
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

  beforeEach(() => {
    render(<FeedbackComponent title={title} onSubmit={onSubmit} controls={controls} />);
  })

  test('Поведение правильности содержимого компонента', () => {
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const subtitle = screen.getByText(options.title);
    expect(subtitle).toBeInTheDocument();

    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toBeDisabled();

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', options.placeholder);
  });

  test('Проверка состояния элемента после ввода комментария', () => {
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const textarea = screen.getByRole('textbox');
    fireEvent.input(textarea, { target: { value: 'test text' } });

    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toBeDisabled();
  });

  test('Проверка наличия сообщения об ошибки после неуспешной отправки фидбэка', async () => {
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const textarea = screen.getByRole('textbox');
    fireEvent.input(textarea, { target: { value: 'test text' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    const errorText = await screen.findByTestId('error-text');
    expect(errorText).toBeInTheDocument();
  });
});

describe('Поведение компонента когда комментарий отсутсвует', () => {
  const controls = [
    {
      id: 'like',
      component: LikeButton,
    },
  ];

  beforeEach(() => {
    render(<FeedbackComponent title={title} onSubmit={onSubmit} controls={controls} />);
  })

  test('Поведение правильности содержимого компонента', () => {
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toBeDisabled();

    const textarea = screen.queryByRole('textbox');
    expect(textarea).toBeNull();
  });

  test('Проверка наличия сообщения об ошибки после неуспешной отправки фидбэка', async () => {
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    const errorText = await screen.findByTestId('error-text');
    expect(errorText).toBeInTheDocument();
  });
});

describe('Проверка поведения компонента после успешной отправки фидбэка', () => {
  test('Проверка удаления компонента', async () => {
    const successfulSubmit = jest.fn().mockResolvedValue({});
    const WrapperComponent = () => {
      const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

      return (
        <div>
          {!isFeedbackSubmitted && (
            <FeedbackComponent title={title} onSubmit={successfulSubmit} controls={controls} />
          )}
        </div>
      );
    };

    render(<WrapperComponent />);

    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    const textarea = screen.getByRole('textbox');
    fireEvent.input(textarea, { target: { value: 'test text' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByTestId('feedback')).toBeNull();
    });

    expect(successfulSubmit).toHaveBeenCalled();
  });
});
