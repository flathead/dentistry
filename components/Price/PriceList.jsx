import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import { Text } from '@/components/Text';
import { usePricePages } from '@/lib/price';
import styles from './CommentList.module.css';
import PriceItem from './Price';

const PriceList = ({ service }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePricePages({
    serviceId: service._id,
  });

  const prices = data
    ? data.reduce((acc, val) => [...acc, ...val.prices], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis='vertical' size={1} />
      {prices.map((price) => (
        <div key={price._id} className={styles.wrap}>
          <PriceItem className={styles.comment} item={price} />
        </div>
      ))}
      <Container justifyContent='center'>
        {isReachingEnd ? (
          <Text color='secondary'>Больше нет комментариев...</Text>
        ) : (
          <Button
            variant='ghost'
            type='success'
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Загрузить ещё
          </Button>
        )}
      </Container>
    </div>
  );
};

export default PriceList;
