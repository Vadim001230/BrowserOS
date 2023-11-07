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

const DislikeButton = (handler) => {
  return UIComponent({
    tag: 'button',
    children: [
      UIComponent({
        tag: 'img',
        attributes: { src: './UI/icons/dislike.svg', alt: 'dislike' },
      }),
    ],
    listeners: { click: (e) => handler(e) },
    attributes: { class: 'feedback__dislike', type: 'button', name: 'dislike' },
  });
};


export { LikeButton, DislikeButton };
