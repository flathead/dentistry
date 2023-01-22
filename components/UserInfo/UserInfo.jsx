import { User } from '@nextui-org/react';
import clsx from 'clsx';
import styles from './UserInfo.module.css';

const UserInfo = ({ size, name, username, url, isPanelOpen }) => {
  const time = new Date().getHours().toLocaleString();
  let dayzone;
  if ((time >= 0 && time <= 6) || (time >= 22 && time <= 23)) {
    dayzone = 'доброй ночи! 🌙';
  } else if (time > 6 && time <= 12) {
    dayzone = 'доброе утро! ☀️';
  } else if (time > 12 && time <= 18) {
    dayzone = 'добрый день! 👋';
  } else if (time > 18 && time < 22) {
    dayzone = 'добрый вечер! 🌇';
  } else {
    dayzone = '';
  }
  return (
    <User
      className={styles.userCard}
      style={{ display: isPanelOpen ? 'inline-flex' : 'contents' }}
      src={url || '/images/default_user.jpg'}
      name={isPanelOpen ? name + ',' : ''}
      bordered
      size={size}
    >
      <div
        className={clsx(
          styles.info,
          isPanelOpen ? styles.infoShown : styles.infoHidden
        )}
      >
        {isPanelOpen ? dayzone : ''}
        {isPanelOpen ? (
          <User.Link href={`/user/${username}`}>@{username}</User.Link>
        ) : (
          ''
        )}
      </div>
    </User>
  );
};

export default UserInfo;
