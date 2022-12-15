import { LoadingDots } from '@/components/LoadingDots';
import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';
import styles from './Button.module.scss';

export const Button = forwardRef(function Button(
  {
    children,
    type,
    className,
    onClick,
    size,
    variant = 'invert',
    loading,
    disabled,
  },
  ref
) {
  return (
    <button
      className={clsx(
        styles.button,
        type && styles[type],
        size && styles[size],
        styles[variant],
        className
      )}
      ref={ref}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && <LoadingDots className={styles.loading} />}
      <span>{children}</span>
    </button>
  );
});

export const ButtonLink = forwardRef(function Button(
  { children, type, className, href, onClick, size, variant = 'invert' },
  ref
) {
  return (
    <Link
      className={clsx(
        styles.button,
        type && styles[type],
        size && styles[size],
        variant && styles[variant],
        className
      )}
      ref={ref}
      href={href}
      onClick={onClick}
    >
      <span>{children}</span>
    </Link>
  );
});

export const ButtonDent = ({
  children,
  type,
  className,
  onClick,
  size,
  loading,
  disabled,
  color,
  href,
  ref,
  target,
}) => {
  return (
    <>
      {href ? (
        <a
          className={clsx(
            styles.buttonDent,
            color == 'white'
              ? styles.dentWhite
              : color == 'blue'
              ? styles.dentBlue
              : color == 'dark'
              ? styles.dentDark
              : '',
            type && styles[type],
            size && styles[size],
            //styles[variant],
            className
          )}
          href={href}
          target={target}
          ref={ref}
          onClick={onClick}
          disabled={loading || disabled}
        >
          {loading && <LoadingDots className={styles.loading} />}
          <span>{children}</span>
        </a>
      ) : (
        <button
          className={clsx(
            styles.buttonDent,
            color == 'white'
              ? styles.dentWhite
              : color == 'blue'
              ? styles.dentBlue
              : color == 'dark'
              ? styles.dentDark
              : '',
            type && styles[type],
            size && styles[size],
            //styles[variant],
            className
          )}
          ref={ref}
          onClick={onClick}
          disabled={loading || disabled}
        >
          {loading && <LoadingDots className={styles.loading} />}
          <span>{children}</span>
        </button>
      )}
    </>
  );
};
