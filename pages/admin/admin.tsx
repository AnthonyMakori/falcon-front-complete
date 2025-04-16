import React from 'react';
import SalesAnalytics from '../../components/Admin/SalesAnalytics';
import ClientManagement from '../../components/Admin/ClientManagement';

const AdminPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <SalesAnalytics />
      <ClientManagement />
    </div>
  );
};

export default AdminPage;
