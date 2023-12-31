import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export const useUserContext = () => {
  const userContext = useContext(UserContext)

  return userContext
}
