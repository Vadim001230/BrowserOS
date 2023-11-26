import LikeIcon from '@/assets/like.svg';
import { BaseButton, BaseButtonProps } from '../BaseButton/BaseButton';

interface Props extends BaseButtonProps {}

export const LikeButton = ({ onClick, isChecked }: Props) => (
  <BaseButton onClick={onClick} isChecked={isChecked} className='like-button'>
    <LikeIcon />
  </BaseButton>
);
