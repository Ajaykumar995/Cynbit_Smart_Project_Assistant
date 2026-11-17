import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WizardProvider } from './context/WizardContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import WizardPage from './pages/WizardPage';
import SuccessPage from './pages/SuccessPage';
import TrackInquiryPage from './pages/TrackInquiryPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

export const App = () => {
  return (
    <Router>
      <WizardProvider>
        <div className="flex flex-col min-h-screen bg-[#090D16] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/wizard" element={<WizardPage />} />
              <Route path="/success/:id" element={<SuccessPage />} />
              <Route path="/track" element={<TrackInquiryPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WizardProvider>
    </Router>
  );
};

export default App;
