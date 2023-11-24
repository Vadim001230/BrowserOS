import LikeIcon from '../assets/like.svg';

interface LikeBtnProps {
  onClick: () => void;
  checked: boolean;
}

export const LikeBtn = ({ onClick, checked }: LikeBtnProps) => (
  <button
    type="button"
    className={`${checked ? 'checked' : ''} ${'feedback__reaction-btn feedback__like'}`}
    onClick={onClick}
  >
    <LikeIcon />
  </button>
);
