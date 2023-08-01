import { Outlet } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"

export const ProtectedRoutes = () => {
  const {loading} = useUserContext()

  if(loading) {
    return <div>Carregando...</div>
  }
  return <Outlet/>
}