import { useContactCardContext } from "../../hooks/useContactCardContext"
import { ContactCard } from "../ContactCard"

export const ContactList = () => {
  const {contactList} = useContactCardContext()
  return (
    <ul>
      {contactList.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </ul>
  )
}