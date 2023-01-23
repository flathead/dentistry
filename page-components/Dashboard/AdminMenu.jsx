import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Camera,
  Feather,
  Grid,
  Percent,
  Server,
  //Settings,
  Users,
} from 'react-feather';
import styles from './AdminMenu.module.scss';

const { Card } = require('@nextui-org/react');

export const adminLinks = [
  {
    id: 'admin-1',
    url: '/admin',
    name: 'Центр',
    icon: <Grid size={18} />,
  },
  {
    id: 'admin-2',
    url: '/admin/staff',
    name: 'Персонал',
    icon: <Users size={18} />,
  },
  {
    id: 'admin-3',
    url: '/admin/services',
    name: 'Услуги',
    icon: <Server size={18} />,
  },
  {
    id: 'admin-4',
    url: '/admin/promo',
    name: 'Акции',
    icon: <Percent size={18} />,
  },
  {
    id: 'admin-5',
    url: '/admin/portfolio',
    name: 'Работы',
    icon: <Camera size={18} />,
  },
  {
    id: 'admin-6',
    url: '/admin/reviews',
    name: 'Отзывы',
    icon: <Feather size={18} />,
  },
  /* {
    id: 'admin-6',
    url: '/admin/user-settings',
    name: 'Пользователи',
    icon: <Users size={18} />,
  }, */
  /* {
    id: 'admin-7',
    url: '/admin/settings',
    name: 'Настройки',
    icon: <Settings size={18} />,
  }, */
];

const AdminMenu = () => {
  const router = useRouter();

  return (
    <Card className={styles.links}>
      {adminLinks.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className={clsx(
            styles.link,
            router.pathname == link.url ? styles.current : null
          )}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </Card>
  );
};

export default AdminMenu;
