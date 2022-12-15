import clsx from 'clsx';
import styles from './Modal.module.scss';

const Modal = ({ isOpen }) => {
  return (
    <div className={clsx(styles.modalWrapper, isOpen && styles.opened)}>
      <div className={styles.modal}>modal</div>
    </div>
  );
};

export default Modal;
