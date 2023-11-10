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
| [`btn`](#)             | `function`   |              | Функция создания кнопки реакции.          |
| [`commentOptions`](#)  | `object`     |              | Объект настройки комментария. Принимает `required`, `subtitle`, `placeholder`.  Если объект не передан, блок комментария не будет появляться.|
| [`required`](#)        | `boolean`    | `false`      | Значение определяющие обязательный ли комментарий.              |
| [`subtitle`](#)        | `string`     |              | Заголовок комментария.                                          |
| [`placeholder`](#)     | `string`     | `''`         | Placeholder внутри элемента комментария.                        |

---

### Пример использования

```js
import FeedbackComponent from '../components/feedback.js'
import { LikeButton, DislikeButton }from '../UI/reactionButtons.js';

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
        subtitle: 'Why did you selected not useful?',
        placeholder: 'Write here...',
      },
    },
  ]
})

export default SimpleFeedback;

```

---
### Создание кнопок реакции

Для создания кнопки необходимо создать функцию, которая принимает handler (функцию-обработчик) в качестве параметра и возвращает результат вызова функции конструктора `UIComponent`. `UIComponent` - это функция, которая создает DOM-элемент на основе переданных параметров:

```js
import UIComponent from './UIComponent.js';

const LikeButton = (handler) => {
  return UIComponent({
    tag: 'button',
    children: [
      UIComponent({
        tag: 'img',
        attributes: { src: './UI/icons/like.svg', alt: 'like' },
      }),
    ],
    listeners: { click: (e) => handler(e) },
    attributes: { class: 'feedback__like', type: 'button', name: 'like' },
  });
};
```

| Опции                  | Тип          |  Описание                                                        |
| -----------------------| ------------ |  --------------------------------------------------------------- |
| [`tag`](#)             | `string`     | Тег HTML-элемента.                                               |
| [`children`](#)        | `array`      | Массив дочерних элементов (HTMLElement или строк).               |
| [`listeners`](#)       | `object`     | Объект событий и их обработчиков.                                |
| [`attributes`](#)      | `object`     | Атрибуты элемента. Аттрибут `name` обязательный, в него передается значение которое отправится на сервер, если оно будет выбрано |

---
### Передача onSubmit

В `onSubmit` вы можете обрабатывать поведение компонента после успешной его отправки на сервер. Например удалить его:

```js
onSubmit: (e, form) => {
    e.preventDefault();
    return fetch('url', {
      method: 'POST',
      body: new FormData(form)
    }).then((response) => response.json())
      .then(() => form.remove());
  },
```

Или показать сообщение что фидбэк успешно отправлен:

```js
  onSubmit: (e, form) => {
    e.preventDefault();
    return fetch('url', {
      method: 'POST',
      body: new FormData(form)
    }).then((response) => response.json())
      .then(() => {
        const span = document.createElement('span');
        span.textContent = 'Feedback sent successfully!'
        span.style.color = 'green';
        form.after(span);
        form.remove();
      });
  },
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
  - Форма уже содержит данные выбраной пользователем кнопки и комментария. Для отправки данных на сервер достаточно использовать  `new FormData(form)`, где `form` – элемент формы. Переданное значение на сервер будет формата `{ reaction: string, comment: string }`, где `reaction` – значение выбранной кнопки, `comment` – текст комментария.


### Назначение зависимостей в проекте 
- jest - фреймворк для тестирования JavaScript кода
- jest-environment-jsdom – предоставляет среду выполнения для Jest, которая имитирует браузерную среду, используя jsdom
- babel-jest – зависимость для понимания Jest-ом синтаксиса импорта и экспорта ES модулей 


### Исходное задание

[Описание задания](./docs/TASK.md)
