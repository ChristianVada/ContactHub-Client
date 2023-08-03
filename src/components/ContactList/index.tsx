import { useContactContext } from "../../hooks/useContactContext"
import { ContactCard } from "../ContactCard"
import { StyledUl } from "./style"

export const ContactList = () => {
  const { contactList } = useContactContext()

  return (
    <StyledUl>
      {contactList.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </StyledUl>
  )
}
