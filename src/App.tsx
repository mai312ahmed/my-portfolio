import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Home } from './pages/Home';
import { ProjectDetails } from './pages/ProjectDetails';
import { AdminDashboard } from './admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};
export default App;
