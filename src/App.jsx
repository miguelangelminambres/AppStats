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
import Settings from '@/pages/Settings'

const PlayersPage = () => <div className="page-container"><h1 className="page-title">Plantilla</h1><p>Próximamente: Gestión de jugadores</p></div>
const MatchesPage = () => <div className="page-container"><h1 className="page-title">Partidos</h1><p>Próximamente: Gestión de partidos</p></div>
const StatsPage = () => <div className="page-container"><h1 className="page-title">Estadísticas</h1><p>Próximamente: Estadísticas detalladas</p></div>

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
            {/* Ruta inicial - Validación de licencia */}
            <Route path="/license" element={<LicenseValidation />} />
            
            {/* Registro con licencia validada */}
            <Route path="/register" element={<Register />} />
            
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard principal (protegido) */}
           {/* Redirigir raíz a licencia */}
<Route path="/" element={<Navigate to="/license" replace />} />

{/* Dashboard principal (protegido) */}
<Route path="/dashboard" element={
  <ProtectedRoute>
    <MainLayout>
      <Dashboard />
    </MainLayout>
  </ProtectedRoute>
} />
            
            {/* Rutas protegidas */}
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
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Redirigir a licencia por defecto */}
            <Route path="*" element={<Navigate to="/license" replace />} />
          </Routes>
        </LicenseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App