import { useCurrentUser } from '@/lib/user';
import styles from './Panel.module.scss';
import { Tooltip } from '@nextui-org/react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import { UserInfo } from '../UserInfo';
import { useCallback, useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const PanelControls = ({ user, mutate, top, hidden }) => {
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  const [open, setOpen] = useState(false);
  const panelHandler = () => {
    setOpen(!open ? true : false);
  };

  const deleteAuth = useCallback(async () => {
    try {
      await fetcher('/api/auth', {
        method: 'DELETE',
      });
      toast.success('Вы выполнили выход');
      mutate({ user: null });
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return (
    <div
      className={clsx(styles.panel, hidden && styles.hidden)}
      style={{
        top: top <= 20 ? '120px' : '80px',
        height: top <= 20 ? 'calc(100vh - 140px)' : 'calc(100vh - 100px)',
        width: !open
          ? windowDimenion.winWidth >= 1200
            ? '48px'
            : '38px'
          : windowDimenion.winWidth < 1200
          ? '200px'
          : 'calc(100% - 6px)',
      }}
    >
      <button
        onClick={panelHandler}
        className={open ? styles.handlerBtnOpened : styles.handlerBtnClosed}
      >
        {!open ? <Icon.ChevronRight /> : <Icon.ChevronsLeft />}
      </button>
      <div
        className={styles.panelGroup}
        style={{
          alignItems: !open ? 'center' : 'flex-start',
        }}
      >
        {user ? (
          <>
            <UserInfo
              isPanelOpen={open}
              size={open ? 'xl' : windowDimenion.winWidth < 1200 ? 'sm' : 'md'}
              username={user.username}
              url={user.profilePicture}
              name={user.name}
            />
            <div className={styles.separator} />
          </>
        ) : (
          <></>
        )}
        <Tooltip
          content={!open ? 'Центр' : ''}
          color='primary'
          placement='right'
        >
          <Link href={'/admin'} className={styles.item}>
            <Icon.Grid size={22} color={'#222'} />
            <p
              className={styles.itemName}
              style={{
                display: !open ? 'none' : 'flex',
              }}
            >
              Центр
            </p>
          </Link>
        </Tooltip>
        <Tooltip content={!open ? 'Персонал' : ''} placement='right'>
          <Link href={'/admin/staff'} className={styles.item}>
            <Icon.Users size={22} color={'#222'} />
            <p
              className={styles.itemName}
              style={{
                display: !open ? 'none' : 'flex',
              }}
            >
              Персонал
            </p>
          </Link>
        </Tooltip>
        <Tooltip content={!open ? 'Услуги' : ''} placement='right'>
          <Link href={'/admin/services'} className={styles.item}>
            <Icon.Server size={22} color={'#222'} />
            <p
              className={styles.itemName}
              style={{
                display: !open ? 'none' : 'flex',
              }}
            >
              Услуги
            </p>
          </Link>
        </Tooltip>
        <Tooltip content={!open ? 'Пользователи' : ''} placement='right'>
          <Link href={'/admin/users'} className={styles.item}>
            <Icon.Users size={22} color={'#222'} />
            <p
              className={styles.itemName}
              style={{
                display: !open ? 'none' : 'flex',
              }}
            >
              Пользователи
            </p>
          </Link>
        </Tooltip>
      </div>

      <div className={styles.panelGroup}>
        <Tooltip content={!open ? 'Выйти' : ''} color='error' placement='right'>
          <button onClick={deleteAuth} className={styles.item}>
            <Icon.LogOut size={22} color={'#222'} />
            <p
              className={styles.itemName}
              style={{
                display: !open ? 'none' : 'flex',
              }}
            >
              Выйти
            </p>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

const Panel = ({ top, hidden }) => {
  const { data: { user } = {}, mutate } = useCurrentUser();

  return (
    <>
      {user && user.role == 'admin' ? (
        <>
          <PanelControls
            top={top}
            user={user}
            mutate={mutate}
            hidden={hidden}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Panel;
