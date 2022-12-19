import clsx from 'clsx';
import Link from 'next/link';
import { Grid, Server, Users } from 'react-feather';
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
    url: '/admin/users',
    name: 'Пользователи',
    icon: <Users size={18} />,
  },
];

const AdminMenu = () => {
  return (
    <Card className={styles.links}>
      {adminLinks.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className={clsx(
            styles.link,
            window.location.pathname == link.url ? styles.current : null
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
