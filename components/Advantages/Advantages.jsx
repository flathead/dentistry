import { Popover } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './Advantages.module.scss';

const Advantages = ({
  imageSrc,
  staticImage,
  adv1_title,
  adv1_descr,
  adv2_title,
  adv2_descr,
  adv3_title,
  adv3_descr,
  adv4_title,
  adv4_descr,
  adv5_title,
  adv5_descr,
  adv6_title,
  adv6_descr,
  adv7_title,
  adv7_descr,
  adv8_title,
  adv8_descr,
}) => {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  return (
    <div className={clsx(styles.advantages, staticImage && styles.centerPar)}>
      <div className={styles.imageContainer}>
        <Image
          src={
            'https://res.cloudinary.com/dv3q1dxpi/image/upload/v1670603179/advantages/Group_29_vpweyg.png'
          }
          alt={'Фон преимуществ'}
          priority={false}
          width={400}
          height={400}
          className={styles.bg}
        />
        <Image
          src={imageSrc}
          alt={'Коренной зуб'}
          priority={false}
          width={180}
          height={220}
          className={clsx(styles.tooth, staticImage && styles.staticImage)}
        />
        {adv1_title && (
          <Popover
            placement={width >= 960 ? 'left-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv1} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv1_title}</p>
              </button>
            </Popover.Trigger>
            {adv1_descr && (
              <Popover.Content>
                <p>{adv1_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv2_title && (
          <Popover placement={width >= 960 ? 'left' : 'right'} disableShadow>
            <Popover.Trigger>
              <button id={styles.adv2} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv2_title}</p>
              </button>
            </Popover.Trigger>
            {adv2_descr && (
              <Popover.Content>
                <div className={styles.popContent}>
                  <p className={styles.popTitle}>{adv2_title}</p>
                  <p className={styles.popDescr}>{adv2_descr}</p>
                </div>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv3_title && (
          <Popover placement={width >= 960 ? 'left' : 'right'} disableShadow>
            <Popover.Trigger>
              <button id={styles.adv3} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv3_title}</p>
              </button>
            </Popover.Trigger>
            {adv3_descr && (
              <Popover.Content>
                <p>{adv3_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv4_title && (
          <Popover
            placement={width >= 960 ? 'left-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv4} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv4_title}</p>
              </button>
            </Popover.Trigger>
            {adv4_descr && (
              <Popover.Content>
                <p>{adv4_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {/* Right side */}
        {adv5_title && (
          <Popover
            placement={width >= 960 ? 'right-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv5} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv5_title}</p>
              </button>
            </Popover.Trigger>
            {adv5_descr && (
              <Popover.Content>
                <p>{adv5_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv6_title && (
          <Popover
            placement={width >= 960 ? 'right-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv6} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv6_title}</p>
              </button>
            </Popover.Trigger>
            {adv6_descr && (
              <Popover.Content>
                <p>{adv6_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv7_title && (
          <Popover
            placement={width >= 960 ? 'right-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv7} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv7_title}</p>
              </button>
            </Popover.Trigger>
            {adv7_descr && (
              <Popover.Content>
                <p>{adv7_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
        {adv8_title && (
          <Popover
            placement={width >= 960 ? 'right-bottom' : 'right'}
            disableShadow
          >
            <Popover.Trigger>
              <button id={styles.adv8} className={styles.triggerButton}>
                <span></span>
                <span></span>
                <p>{adv8_title}</p>
              </button>
            </Popover.Trigger>
            {adv8_descr && (
              <Popover.Content>
                <p>{adv8_descr}</p>
              </Popover.Content>
            )}
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Advantages;
