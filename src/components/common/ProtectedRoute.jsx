import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Loading from './Loading'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading message="Verificando sesión..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
