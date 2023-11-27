import DislikeIcon from '@/assets/dislike.svg';
import { BaseButton, BaseButtonProps } from '@/components/UI/BaseButton/BaseButton';

interface Props extends BaseButtonProps {}

export const DislikeButton = ({ ...args }: Omit<Props, 'children'>) => (
  <BaseButton {...args} className={`dislike-button ${args.className || ''}`} >
    <DislikeIcon />
  </BaseButton>
);
