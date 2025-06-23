import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { Book, Home, Settings, Users } from 'lucide-react'

const Sidebar = (): JSX.Element => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 400) {
      setIsToggled(true);
    }
  }, []);

  return (
    <div className={`${styles.sidebar} ${isToggled ? styles.collapsed : ''}`}>
      <div
        className={styles.toggler}
        onClick={() => {
          setIsToggled((toggled) => !toggled);
        }}
      ></div>
      <img className={styles.logo} src="/logo.png" alt="Baseline" />

      <div className={styles.links}>
        <Link
          to="/dashboard"
          className={`${styles.link} ${
            location.pathname === '/dashboard' ? styles.active : ''
          }`}
        >
          <Home color="black" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/blogs"
          className={`${styles.link} ${
            location.pathname === '/blogs' ? styles.active : ''
          }`}
        >
          <Book color="black" />
          <span>Blogs</span>
        </Link>

        <div className={styles.spacer} />

        <div className={styles.spacer} />

        <Link
          to="/admins"
          className={`${styles.link} ${
            location.pathname === '/admins' ? styles.active : ''
          }`}
        >
          <Users color="black" />
          <span>Admins</span>
        </Link>

        <Link
          to="/settings"
          className={`${styles.link} ${
            location.pathname === '/settings' ? styles.active : ''
          }`}
        >
          <Settings color="black" />
          <span>Account Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
