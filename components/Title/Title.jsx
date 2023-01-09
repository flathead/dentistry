import clsx from 'clsx';
import styles from './Title.module.scss';

const Title = ({
  size,
  mt0,
  mb0,
  className,
  template,
  center,
  crop,
  children,
}) => {
  return (
    <>
      {size === 1 ? (
        <h1
          className={clsx(
            styles.titleOne,
            mt0 && styles.mt0,
            mb0 && styles.mb0,
            className,
            template === 'pageTitle' && styles.pageTitle,
            template === 'serviceTitle' && styles.serviceTitle,
            center && styles.centered,
            crop && styles.cropped
          )}
        >
          {children}
        </h1>
      ) : size === 2 ? (
        <h2
          className={clsx(
            styles.titleTwo,
            mt0 && styles.mt0,
            mb0 && styles.mb0,
            className,
            template === 'pageTitle' && styles.pageTitle,
            center && styles.centered,
            crop && styles.cropped
          )}
        >
          {children}
        </h2>
      ) : size === 3 ? (
        <h3
          className={clsx(
            styles.titleThree,
            mt0 && styles.mt0,
            mb0 && styles.mb0,
            className,
            template === 'newsTitle' && styles.newsTitle,
            center && styles.centered,
            crop && styles.cropped
          )}
        >
          {children}
        </h3>
      ) : (
        <h4
          className={clsx(
            styles.titleFour,
            mt0 && styles.mt0,
            mb0 && styles.mb0,
            className,
            center && styles.centered,
            crop && styles.cropped
          )}
        >
          {children}
        </h4>
      )}
    </>
  );
};

export default Title;
