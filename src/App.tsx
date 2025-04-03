import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoadProfile from './components/RoadProfile';
import BasicData from './components/BasicData';
import TrafficEnvironment from './components/TrafficEnvironment';
import RoadCondition from './components/RoadCondition';
import MaintenanceHistory from './components/MaintenanceHistory';
import DecisionSupport from './components/DecisionSupport';
import MaintenanceEval from './components/MaintenanceEval';
import Statistics from './components/Statistics';
import Login from './components/Login';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查登录状态
    const loginStatus = Cookies.get('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'roadProfile':
        return <RoadProfile />;
      case 'basicData':
        return <BasicData />;
      case 'trafficEnvironment':
        return <TrafficEnvironment />;
      case 'detection':
      case 'results':
      case 'report':
      case 'roadCondition':
        return <RoadCondition />;
      case 'maintenanceHistory':
        return <MaintenanceHistory />;
      case 'decisionSupport':
        return <DecisionSupport />;
      case 'maintenanceEval':
        return <MaintenanceEval />;
      case 'statistics':
        return <Statistics />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {renderPage()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;