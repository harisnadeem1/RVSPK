import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import DisclaimerModal from './components/DisclaimerModal.jsx';
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';
import ProtectedSuperAdminRoute from './components/ProtectedSuperAdminRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MarketsPage from './pages/MarketsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import ClientsAreaPage from './pages/ClientsAreaPage.jsx';
import CompanyProfilePage from './pages/CompanyProfilePage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UploadReports from './pages/admin/UploadReports.jsx';
import ManageReports from './pages/admin/ManageReports.jsx';
import ManageAdmins from './pages/admin/ManageAdmins.jsx';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <DisclaimerModal />}

      <Routes>
        {/* Public Routes */}
        <Route path="/"                element={<HomePage />} />
        <Route path="/about"           element={<AboutPage />} />
        <Route path="/markets"         element={<MarketsPage />} />
        <Route path="/reports"         element={<ReportsPage />} />
        <Route path="/clients"         element={<ClientsAreaPage />} />
        <Route path="/company-profile" element={<CompanyProfilePage />} />
        <Route path="/board"           element={<BoardPage />} />
        <Route path="/contact"         element={<ContactPage />} />
        <Route path="/legal"           element={<LegalPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/upload-reports"
          element={
            <ProtectedAdminRoute>
              <UploadReports />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/manage-reports"
          element={
            <ProtectedAdminRoute>
              <ManageReports />
            </ProtectedAdminRoute>
          }
        />

        {/* Super Admin Only */}
        <Route
          path="/admin/manage-admins"
          element={
            <ProtectedSuperAdminRoute>
              <ManageAdmins />
            </ProtectedSuperAdminRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page not found</h1>
              <p className="text-muted-foreground mb-8">The page you are looking for does not exist.</p>
              <a href="/" className="btn-primary">Back to home</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <AppContent />
      </AdminAuthProvider>
    </Router>
  );
}

export default App;