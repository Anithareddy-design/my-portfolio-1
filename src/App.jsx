import React, { useState } from 'react';
import { usePortfolio } from './context/PortfolioContext';

// Public Components
import Navbar from './components/Navbar';
import MobileDrawer from './components/MobileDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import JarvisSection from './components/JarvisSection';
import JarvisOverlay from './components/JarvisOverlay';
import Beyond from './components/Beyond';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin Components
import AdminPortal from './components/admin/AdminPortal';

// Global Utilities
import RoleSwitcher from './components/RoleSwitcher';
import Toast from './components/common/Toast';
import MaintenanceScreen from './components/common/MaintenanceScreen';

export default function App() {
  const { currentView, data, activeRole } = usePortfolio();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Maintenance check for public view (Admin role can preview while in maintenance)
  const isMaintenanceActive = Boolean(data.site?.maintenance) && activeRole !== 'admin';

  return (
    <div className="portfolio-app">
      {currentView === 'admin' ? (
        <AdminPortal />
      ) : isMaintenanceActive ? (
        <MaintenanceScreen />
      ) : (
        <>
          <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} />
          <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          
          <main>
            <Hero />
            <About />
            <Skills />
            <Work />
            <JarvisSection />
            <Beyond />
            <Contact />
          </main>

          <Footer />
        </>
      )}

      {/* Global Interactive Overlays */}
      <JarvisOverlay />
      {/* Dev toolbar — hidden in production builds */}
      {import.meta.env.DEV && <RoleSwitcher />}
      <Toast />
    </div>
  );
}
