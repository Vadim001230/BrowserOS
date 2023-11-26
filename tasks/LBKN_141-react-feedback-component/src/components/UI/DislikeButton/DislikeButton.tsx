import DislikeIcon from '@/assets/dislike.svg';
import { BaseButton, BaseButtonProps } from '../BaseButton/BaseButton';

interface Props extends BaseButtonProps {}

export const DislikeButton = ({ onClick, isChecked }: Props) => (
  <BaseButton onClick={onClick} isChecked={isChecked} className='dislike-button'>
    <DislikeIcon />
  </BaseButton>
);
