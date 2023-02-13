import { useActivator } from './useActivator'
import { useDeactivator } from './useDeactivator'

const useAuth = () => {
  const login = useActivator()
  const logout = useDeactivator()

  return { logout, login }
}

export default useAuth
