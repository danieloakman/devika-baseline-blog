import React from 'react';
import styles from './DashboardContent.module.scss';
import { CardButton } from '@baseline/components';
import { useNavigate } from 'react-router-dom';

const DashboardContent = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <CardButton
          title="Blogs"
          description="Manage blogs"
          onClick={() => navigate('/blogs')}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
