import { FeedbackComponent } from '../components/feedback.js';
import LikeButton from '../components/likeButton.js';

describe('Тестирование компонента Feedback', () => {
  describe('Проверка корректно ли создан компонент', () => {
    const title = 'Test Title';
    const onSubmit = jest.fn().mockRejectedValue(new Error('Async error message'));
    const options = {
      required: true,
      title: 'Test subtitle',
      placeholder: 'Test placeholder',
    }
    const controls = [
      {
        id: 'like',
        element: LikeButton,
        commentOptions: options,
      },
    ];

    const component = FeedbackComponent({ title, onSubmit, controls });

    test('Компонент фидбэка существует', () => {
      expect(component).toBeDefined();
    });

    test('Проверка правильности содержимого заголовка', () => {
      const titleEl = component.querySelector('.feedback__title');
      expect(titleEl.textContent).toBe(title);
    });
  });

  describe('Поведение компонента когда комментарий обязателен', () => {
    const title = 'Test Title';
    const onSubmit = jest.fn().mockRejectedValue(new Error('Async error message'));
    const options = {
      required: true,
      title: 'Test subtitle',
      placeholder: 'Test placeholder',
    }
    const controls = [
      {
        id: 'like',
        element: LikeButton,
        commentOptions: options,
      },
    ];

    const component = FeedbackComponent({ title, onSubmit, controls });

    test('Проверка состояния элемента после клика на кнопку реакции', () => {
      const likeButton = component.querySelector('.feedback__like');
      likeButton.dispatchEvent(new Event('click'));

      const subtitle = component.querySelector('p');
      expect(subtitle.textContent).toBe(options.title);

      const submitButton = component.querySelector('.feedback__submit-btn');
      expect(submitButton.disabled).toBe(true);

      const textarea = component.querySelector('.textarea');
      expect(textarea).toBeDefined();
      expect(textarea.placeholder).toBe(options.placeholder);
      expect(textarea.required).toBe(true);
    });

    describe('Проверка состояния элемента после ввода комментария', () => {
      test('Кнопка submit доступна', () => {
        const textarea = component.querySelector('.textarea');
        let submitButton = component.querySelector('.feedback__submit-btn');
        textarea.value = 'test text';
        textarea.dispatchEvent(new Event('input'));
        submitButton = component.querySelector('.feedback__submit-btn');
        expect(submitButton.disabled).toBe(false);
      });

      test('Проверка обработки ошибок после выполнения submit с ошибкой', () => {
        const submitButton = component.querySelector('.feedback__submit-btn');
        submitButton.dispatchEvent(new Event('click'));
        const textError = component.querySelector('span');
        expect(textError).toBeDefined();
      });
    });
  });

  describe('Поведение компонента когда комментарий опционален', () => {
    const title = 'Test Title';
    const onSubmit = jest.fn().mockRejectedValue(new Error('Async error message'));
    const options = {
      required: false,
      title: 'Test subtitle',
      placeholder: 'Test placeholder',
    }
    const controls = [
      {
        id: 'like',
        element: LikeButton,
        commentOptions: options,
      },
    ];

    test('Проверка состояния элемента после клика на кнопку реакции', () => {
      const component = FeedbackComponent({ title, onSubmit, controls });

      const likeButton = component.querySelector('.feedback__like');
      likeButton.dispatchEvent(new Event('click'));

      const submitButton = component.querySelector('.feedback__submit-btn');
      expect(submitButton.disabled).toBe(false);

      const textarea = component.querySelector('.textarea');
      expect(textarea).toBeDefined();
      expect(textarea.required).toBe(false);
    });
  });

  describe('Поведение компонента когда поле комментария отсутсвует', () => {
    const title = 'Test Title';
    const onSubmit = jest.fn().mockRejectedValue(new Error('Async error message'));
    const controls = [{ id: 'like', element: LikeButton }];
    
    test('Проверка состояния элемента после клика на кнопку реакции', () => {
      const component = FeedbackComponent({ title, onSubmit, controls });
  
      const likeButton = component.querySelector('.feedback__like');
      likeButton.dispatchEvent(new Event('click'));
      const submitButton = component.querySelector('.feedback__submit-btn');
      expect(submitButton.disabled).toBe(false);
  
      const textarea = component.querySelector('.textarea');
      expect(textarea).toBeNull();
    });
  });
});


    