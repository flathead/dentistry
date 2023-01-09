import clsx from 'clsx';
import styles from './Wrapper.module.scss';

const Wrapper = ({ disabled, children, className }) => {
  return (
    <div
      className={clsx(disabled && styles.disabled, styles.wrapper, className)}
    >
      {children}
    </div>
  );
};

export default Wrapper;
