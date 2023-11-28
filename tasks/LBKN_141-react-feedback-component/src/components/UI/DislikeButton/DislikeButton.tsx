import DislikeIcon from '@/assets/dislike.svg';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends Omit<BaseButtonProps, 'children'> { }

export const DislikeButton = ({ ...btnAttributes }: Props) => (
  <BaseButton {...btnAttributes} className={`dislike-button ${btnAttributes.className || ''}`} >
    <DislikeIcon />
  </BaseButton>
);
