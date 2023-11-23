import LikeIcon from '../assets/like.svg';

export function LikeBtn() {
  return (
    <button type="button" className="feedback__reaction-btn feedback__like">
      <LikeIcon />
    </button>
  );
}
