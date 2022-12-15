import styles from './Tooltip.module.css';
import { createRef } from 'react';

export default function Tooltip({ children, tooltipText }) {
  const tipRef = createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = '20px';
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = '10px';
  }
  return (
    <div
      className={styles.tooltip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.tip}
        style={{ left: '100%', opacity: 0 }}
        ref={tipRef}
      >
        <div
          className={styles.tipText}
          style={{ left: '-6px', transform: 'rotate(45deg)' }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
}
