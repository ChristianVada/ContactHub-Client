import { useContext } from "react"
import { ContactContext } from "../contexts/ContactContext"

export const useContactContext = () => {
  const contactContext = useContext(ContactContext)

  return contactContext
}
