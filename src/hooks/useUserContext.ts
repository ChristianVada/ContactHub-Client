import { useContext } from "react"
import { UserContext } from "../providers/UserProvider"

export const useUserContext = () => {
  const userContext = useContext(UserContext)

  return userContext
}
