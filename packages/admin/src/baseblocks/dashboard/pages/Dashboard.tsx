import React from 'react';
import PageContent from '../../../components/page-content/PageContent';
import DashboardContent from '../components/dashboard-content/DashboardContent';
import { Helmet } from 'react-helmet';

const Dashboard = (): JSX.Element => (
  <PageContent>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <DashboardContent />
  </PageContent>
);

export default Dashboard;
