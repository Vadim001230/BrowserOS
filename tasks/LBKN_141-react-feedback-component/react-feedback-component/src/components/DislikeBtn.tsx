import DislikeIcon from '../assets/dislike.svg';

export function DislikeBtn() {
  return (
    <button type="button" className="feedback__reaction-btn feedback__dislike">
      <DislikeIcon />
    </button>
  );
}
