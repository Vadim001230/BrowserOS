import LikeIcon from '@/assets/like.svg';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends BaseButtonProps {}

export const LikeButton = ({ ...args }: Omit<Props, 'children'>) => (
  <BaseButton {...args} className={`like-button ${args.className || ''}`} >
    <LikeIcon />
  </BaseButton>
);