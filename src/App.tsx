import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SchedulePage from './pages/SchedulePage';
import WorkshopsPage from './pages/WorkshopsPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import CompetitionsPage from './pages/CompetitionsPage';
import AccommodationPage from './pages/AccommodationPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import SplashLogo from './components/SplashLogo';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const [showSplash, setShowSplash] = useState(!isAdminRoute);

  // Lock scroll while splash is active
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashLogo onComplete={() => setShowSplash(false)} />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="workshops" element={<WorkshopsPage />} />
          <Route path="workshops/:id" element={<WorkshopDetailsPage />} />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="accommodation" element={<AccommodationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="terms" element={<TermsAndConditionsPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Admin Console Route Nodes */}
        <Route path="admin" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;