import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLicense } from '@/contexts/LicenseContext'
import { User, Key, LogOut, Shield, Mail, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const navigate = useNavigate()
  const { user, signOut, updatePassword } = useAuth()
  const { currentLicense, licenses, switchLicense, hasMultipleLicenses } = useLicense()

  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const { error } = await updatePassword(newPassword)

      if (error) {
        toast.error('Error al cambiar la contraseña')
        return
      }

      toast.success('Contraseña actualizada correctamente')
      setShowPasswordChange(false)
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al cambiar la contraseña')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?')
    if (!confirmed) return

    const { error } = await signOut()
    if (!error) {
      toast.success('Sesión cerrada')
      navigate('/login')
    } else {
      toast.error('Error al cerrar sesión')
    }
  }

  const handleLicenseSwitch = (licenseId) => {
    switchLicense(licenseId)
    toast.success('Licencia cambiada correctamente')
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuración</h1>
        <p className="page-description">
          Gestiona tu cuenta y preferencias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Información de Cuenta
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-base text-gray-900">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Miembro desde</p>
                <p className="text-base text-gray-900">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            {!showPasswordChange ? (
              <button
                onClick={() => setShowPasswordChange(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4" />
                Cambiar Contraseña
              </button>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    placeholder="Repite la contraseña"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    {loading ? 'Actualizando...' : 'Actualizar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false)
                      setNewPassword('')
                      setConfirmPassword('')
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* License Information */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-success-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Licencia Activa
            </h2>
          </div>

          {currentLicense ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-success-50 to-success-100 border-2 border-success-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Nombre del Equipo</p>
                    <p className="text-lg font-semibold text-gray-900">{currentLicense.name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Código de Licencia</p>
                    <p className="text-base font-mono text-success-800">{currentLicense.code}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Plan</p>
                    <p className="text-base text-gray-900">{currentLicense.license_type?.name || 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Estado</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentLicense.status === 'active'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {currentLicense.status === 'active' ? 'Activa' : currentLicense.status}
                    </span>
                  </div>
                </div>
              </div>

              {hasMultipleLicenses && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Otras Licencias Disponibles
                  </p>
                  <div className="space-y-2">
                    {licenses
                      .filter(license => license.id !== currentLicense.id)
                      .map(license => (
                        <button
                          key={license.id}
                          onClick={() => handleLicenseSwitch(license.id)}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <p className="font-medium text-gray-900">{license.name}</p>
                          <p className="text-sm text-gray-600 font-mono">{license.code}</p>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No hay licencia activa</p>
            </div>
          )}
        </div>
      </div>

      {/* Logout Section */}
      <div className="mt-6">
        <div className="card bg-danger-50 border-danger-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Cerrar Sesión
              </h3>
              <p className="text-sm text-gray-600">
                Sal de tu cuenta de forma segura
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-danger flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
