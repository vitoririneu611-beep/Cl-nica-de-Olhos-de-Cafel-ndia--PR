import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Doctors } from './components/Doctors';
import { Services } from './components/Services';
import { Flyers } from './components/Flyers';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyModal } from './components/PrivacyModal';
import { dataService } from './services/dataService';
import { Doctor, ClinicService, ClinicSettings } from './types';

export default function App() {
  const [doctors, setDoctors] = useState<Doctor[]>(dataService.getDoctors());
  const [services, setServices] = useState<ClinicService[]>(dataService.getServices());
  const [settings, setSettings] = useState<ClinicSettings>(dataService.getSettings());

  // Navigation and selection state for booking shortcuts
  const [preSelectedDoctorId, setPreSelectedDoctorId] = useState<string | undefined>();
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();

  // Modals state
  const [adminOpen, setAdminOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = dataService.subscribe(() => {
      setDoctors(dataService.getDoctors());
      setServices(dataService.getServices());
      setSettings(dataService.getSettings());
    });

    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDoctorForBooking = (doctorId: string) => {
    setPreSelectedDoctorId(doctorId);
    handleNavigate('agendamento');
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    handleNavigate('agendamento');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 w-full overflow-x-clip">
      
      {/* 1. Header & Navigation */}
      <Header
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          settings={settings}
          onBookClick={() => handleNavigate('agendamento')}
        />

        {/* 3. About Section */}
        <About />

        {/* 4. Doctors Section */}
        <Doctors
          doctors={doctors}
          onSelectDoctorForBooking={handleSelectDoctorForBooking}
        />

        {/* 5. Services Section */}
        <Services
          services={services}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 6. Four Highlighted Institutional Flyers */}
        <Flyers
          onBookClick={() => handleNavigate('agendamento')}
          onNavigateToServices={() => handleNavigate('servicos')}
          onNavigateToDoctors={() => handleNavigate('medicos')}
        />

        {/* 7. Online Booking Section (Flagship Interactive Engine) */}
        <BookingSection
          doctors={doctors}
          services={services}
          settings={settings}
          preSelectedDoctorId={preSelectedDoctorId}
          preSelectedServiceId={preSelectedServiceId}
          onClearPreSelections={() => {
            setPreSelectedDoctorId(undefined);
            setPreSelectedServiceId(undefined);
          }}
        />

        {/* 8. Location & Google Maps */}
        <LocationSection settings={settings} />
      </main>

      {/* 9. Complete Institutional Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* 10. Configurable Floating WhatsApp Action */}
      <WhatsAppFloating settings={settings} />

      {/* 11. Protected Administration Dashboard */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
        doctors={doctors}
        services={services}
        settings={settings}
      />

      {/* 12. LGPD Privacy Modal */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        settings={settings}
      />
    </div>
  );
}
