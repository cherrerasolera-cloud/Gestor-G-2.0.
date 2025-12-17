import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { WasteLog } from './views/WasteLog';
import { Logistics } from './views/Logistics';
import { Certificates } from './views/Certificates';
import { Directory } from './views/Directory';
import { ConsultingReport } from './views/ConsultingReport';
import { MOCK_MONTHLY_REPORTS } from './constants';
import { MonthlyReport } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Lifted state: Single source of truth for the Monthly Reports
  const [reports, setReports] = useState<MonthlyReport[]>(MOCK_MONTHLY_REPORTS);

  // Handler to update a specific month's report
  const handleUpdateReport = (monthIndex: number, amount: number, fileUrl?: string) => {
    const updated = reports.map(r => r.monthIndex === monthIndex ? {
      ...r,
      kgGenerated: amount,
      status: 'VERIFIED' as const, 
      lastUpdated: new Date().toISOString().split('T')[0],
      fileUrl: fileUrl || r.fileUrl
    } : r);
    setReports(updated);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'waste':
        return <WasteLog 
          onRegister={(monthIndex, amount, fileName) => {
            handleUpdateReport(monthIndex, amount, fileName);
            setCurrentView('certificates'); 
          }} 
        />;
      case 'logistics':
        return <Logistics />;
      case 'certificates':
        return <Certificates reports={reports} onUpdateReport={handleUpdateReport} />;
      case 'report':
        return <ConsultingReport />;
      case 'directory':
        return <Directory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;