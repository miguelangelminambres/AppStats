import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { LicenseProvider } from '@/contexts/LicenseContext'

import ProtectedRoute from '@/components/common/ProtectedRoute'
import MainLayout from '@/components/layout/MainLayout'

import LicenseValidation from '@/pages/auth/LicenseValidation'
import Register from '@/pages/auth/Register'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/Dashboard'
import PlayersPage from '@/pages/PlayersPage'
import MatchesPage from './pages/MatchesPage'
const StatsPage = () => (
  <div className="page-container">
    <h1 className="page-title">Estadísticas</h1>
    <p>Próximamente: Estadísticas detalladas</p>
  </div>
)
const SettingsPage = () => (
  <div className="page-container">
    <h1 className="page-title">Configuración</h1>
    <p className="text-gray-600">Próximamente: Configuración de la aplicación</p>
  </div>
)
function App() {
  return (
    <Router>
      <AuthProvider>
        <LicenseProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          <Routes>
            <Route path="/license" element={<LicenseValidation />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Navigate to="/license" replace />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/players" element={
              <ProtectedRoute>
                <MainLayout>
                  <PlayersPage />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/matches" element={
              <ProtectedRoute>
                <MainLayout>
                  <MatchesPage />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/stats" element={
              <ProtectedRoute>
                <MainLayout>
                  <StatsPage />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/license" replace />} />
          </Routes>
        </LicenseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App