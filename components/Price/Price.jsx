import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Comment.module.css';

const PriceItem = ({ item, className }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(item.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [item.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/test/${item.creator.username}`}>
        <Container className={styles.creator}>
          <Container column className={styles.meta}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.username}>{item.cost}</p>
          </Container>
        </Container>
      </Link>
      <div className={styles.wrap}>
        <time dateTime={String(item.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default PriceItem;
