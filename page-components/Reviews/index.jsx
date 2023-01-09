import { Spacer } from '@/components/Layout';
import ReviewList from './ReviewList';

export const Reviews = () => {
  return (
    <div>
      <Spacer size={1} axis='vertical' />
      <ReviewList template={'list'} />
    </div>
  );
};
