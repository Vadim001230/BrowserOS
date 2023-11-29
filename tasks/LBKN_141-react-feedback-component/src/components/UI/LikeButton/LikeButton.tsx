import LikeIcon from '@/assets/like.svg';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const LikeButton = ({ ...btnAttributes }: Props) => (
  <BaseButton {...btnAttributes} className={`like-button ${btnAttributes.className || ''}`}>
    <LikeIcon />
  </BaseButton>
);
