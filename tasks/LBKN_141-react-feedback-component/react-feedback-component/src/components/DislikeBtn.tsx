import DislikeIcon from '../assets/dislike.svg';

interface DislikeBtnProps {
  onClick: () => void;
  checked: boolean;
}

export const DislikeBtn = ({ onClick, checked }: DislikeBtnProps) => (
  <button
    type="button"
    className={`${checked ? 'checked' : ''} ${'feedback__reaction-btn feedback__dislike'}`}
    onClick={onClick}
  >
    <DislikeIcon />
  </button>
);
