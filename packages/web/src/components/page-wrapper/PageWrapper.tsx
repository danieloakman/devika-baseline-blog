import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styles from './PageWrapper.module.scss';

interface Props {
  children: ReactNode;
  title?: string;
}

const PageWrapper = ({ children, title }: Props) => (
  <div className={styles.container}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
);

export default PageWrapper;
