import { IContact } from "../../providers/ContactCardProvider"

interface IContactProps {
  contact: IContact
}

export const ContactCard = ({contact}: IContactProps) => {
  return (
    <li>
      <h3>{contact.name} </h3>
      <p>{contact.id}</p>
      <p>{contact.email}</p>
      <p>{contact.telephone}</p>
      <p>{contact.created_at}</p>
    </li>
  )
}