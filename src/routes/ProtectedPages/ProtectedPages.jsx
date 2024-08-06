import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedPages = () => {
  const location = useLocation()
  const isAuthenticated = useSelector((state) => state.user.accessToken)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
