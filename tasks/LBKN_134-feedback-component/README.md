# Feedback Component

### Краткое описание

Переиспользуемый JavaScript-компонент для сбора пользовательского фидбэка с возможностью настройки опций.

### Демо

<p align="center">
  <img width="50%" src="docs/demo.gif" alt="demo" />
</p>

---

### Опции

| Опции                  | Тип          | По умолчанию | Описание                                                        |
| -----------------------| ------------ | -------------| --------------------------------------------------------------- |
| [`title`](#)           | `string`     |              | Заголовок компонента.                                           |
| [`onSubmit`](#)        | `function`   |              | Функция обработки отправления данных из компонента на сервер. Функция должна возвращать промис.  |
| [`controls`](#)        | `array`      |              | Массив с объектами настроек кнопок и комментариев. Количество кнопок не ограничено.|
| [`id`](#)              | `string`     |              | Значение элемента, которое отправится на сервер, при его выборе.|
| [`element`](#)         | `function`   |              | Функция создания кнопки реакции.                                |
| [`commentOptions`](#)  | `object`     |              | Объект настройки комментария. Принимает `required`, `title`, `placeholder`.  Если объект не передан, блок комментария не будет появляться.|
| [`required`](#)        | `boolean`    | `false`      | Значение определяющие обязательный ли комментарий.              |
| [`title`](#)           | `string`     |              | Заголовок комментария.                                          |
| [`placeholder`](#)     | `string`     | `''`         | Placeholder внутри элемента комментария.                        |

---

### Пример использования

```js
import { FeedbackComponent } from '../components/feedback.js'
import LikeButton from '../components/likeButton.js';
import DislikeButton from '../components/dislikeButton.js';
import UIComponent from '../UI/UIComponent.js';

const SimpleFeedback = (handleSubmit, resolve) => FeedbackComponent({
  title: 'The Rating overview is in beta. Did you find it useful? Let us know!',
  onSubmit: async (e, data) => {
    await handleSubmit(e, data);
    resolve(e);
  },
  controls: [
    {
      id: 'like',
      element: LikeButton,
      commentOptions: {
        required: true,
        title: 'Why did you selected useful?',
        placeholder: 'Your feedback...',
      },
    },
    {
      id: 'dislike',
      element: DislikeButton,
      commentOptions: {
        required: false,
        title: 'Why did you selected not useful?',
        placeholder: 'Write here...',
      },
    },
  ]
})

const handleSubmit = async (e, data) => {
  e.preventDefault();
  const response = await fetch('url', {
    method: 'POST',
    body: JSON.stringify(data),
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
```

---
### Создание кнопок реакции

Для создания кнопки необходимо создать функцию, которая принимает handler (функцию-обработчик) в качестве параметра и возвращает результат вызова функции конструктора `UIComponent`. `UIComponent` - это функция, которая создает DOM-элемент на основе переданных параметров:

```js
import UIButton from '../UI/UIButton.js';
import UIComponent from '../UI/UIComponent.js';

const LikeButton = (listeners) => {
  return UIButton({
    children: [
      UIComponent({
        tag: 'img',
        src: './UI/icons/like.svg', 
        alt: 'like',
      }),
    ],
    listeners,
    class: 'feedback__like', 
    name: 'like',
  });
};

```

| Опции                  | Тип          |  Описание                                                        |
| -----------------------| ------------ |  --------------------------------------------------------------- |
| [`tag`](#)             | `string`     | Тег HTML-элемента.                                               |
| [`children`](#)        | `array`      | Массив дочерних элементов (HTMLElement или строк).               |
| [`listeners`](#)       | `object`     | Объект событий и их обработчиков.                                |
| [`attributes`](#)      | `object`     | Атрибуты элемента. Аттрибут `name` обязательный, в него передается значение которое отправится на сервер, если оно будет выбрано. |

---
### Передача onSubmit

В `onSubmit` вы можете обрабатывать поведение компонента после успешной его отправки на сервер. Например удалить его:

```js
onSubmit: async (e, data) => {
  e.preventDefault();
  const response = await fetch('url', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  await response.json();
  return form.remove();
}
```

Или показать сообщение что фидбэк успешно отправлен:

```js
onSubmit: async (e, data) => {
  e.preventDefault();
  const response = await fetch('url', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  await response.json();
  const span = document.createElement('span');
  span.textContent = 'Feedback sent successfully!';
  span.style.color = 'green';
  form.after(span);
  form.remove();
}
```
---

### Встроенная обработка ошибок

Если при отправки данных на сервер происходит ошибка, пользователь увидит предупреждение:

<p align="center">
  <img width="50%" src="docs/error.gif" alt="error" />
</p>

---

### Примеры поведения компонента

  <p>Комментарий опционален (required: false):</p>
  <img src="docs/optional.gif" alt="optional" />

  <p>Комментарий обязательный (required: true):</p>
  <img src="docs/required.gif" alt="required" />

  <p>Без блока комментария:</p>
  <img src="docs/disabled.gif" alt="disabled" />

---

### Детали поведения компонента

  - Кнопок может быть разное количество. Вы сами выбираете их UI и данными которые отправятся при ее выборе.
  - Кнопка может быть выбрана только одна. При переключении между кнопками ранее введенные данные из блока комментария удаляются.
  - При срабатывании события submit, в `onSubmit` передается объект `data`, который сдержит данные формата `{ reaction: string, comment: string }`, где `reaction` – значение выбранной кнопки реакции, `comment` – текст комментария. Этот объект необходимо использовать для отправки данных на сервер.


### Назначение зависимостей в проекте 
- jest - фреймворк для тестирования JavaScript кода
- jest-environment-jsdom – предоставляет среду выполнения для Jest, которая имитирует браузерную среду, используя jsdom
- babel-jest – зависимость для понимания Jest-ом синтаксиса импорта и экспорта ES модулей 


### Исходное задание

[Описание задания](./docs/TASK.md)
