import { useContactContext } from "../../hooks/useContactContext"
import { ContactCard } from "../ContactCard"

export const ContactList = () => {
  const { contactList } = useContactContext()

  return (
    <ul>
      {contactList.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </ul>
  )
}
