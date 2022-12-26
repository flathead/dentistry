import clsx from 'clsx';
import styles from './Container.module.scss';

const Container = ({
  fullscreen,
  fullwidth,
  hide,
  justifyContent,
  flex,
  alignItems,
  column,
  gap,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        styles.container,
        column && styles.column,
        fullwidth && styles.fullwidth,
        fullscreen && styles.fullscreen,
        hide && styles.hide,
        className
      )}
      style={{
        flex,
        justifyContent,
        alignItems,
        gap,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
