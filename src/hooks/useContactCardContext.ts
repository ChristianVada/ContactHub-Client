import { useContext } from "react"
import { ContactCardContext } from "../providers/ContactCardProvider"

export const useContactCardContext = () => {
  const contactCardContext = useContext(ContactCardContext)

  return contactCardContext
}
