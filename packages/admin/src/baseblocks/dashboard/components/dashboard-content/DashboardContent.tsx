import React from 'react';
import styles from './DashboardContent.module.scss';
import CardButton from '@shared-components/CardButton'; // TODO: fix this import

const DashboardContent = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <CardButton title="Blogs" description="Manage blogs" link="/blogs" />
      </div>
    </div>
  );
};

export default DashboardContent;
