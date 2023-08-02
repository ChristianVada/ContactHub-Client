import { useForm } from "react-hook-form"
import { IContact } from "../../contexts/ContactContext"
import { useContactContext } from "../../hooks/useContactContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateData, schema } from "./validator"
import { useRef, useState } from "react"

interface IContactProps {
  contact: IContact
}

export const ContactCard = ({ contact }: IContactProps) => {
  const { updateContact, deleteContact } = useContactContext()

  const [contactId, setContactId] = useState("")

  const modalRef = useRef(null)

  const handleOpenDialog = (contact) => {
    modalRef.current.showModal()
    setContactId(contact.id)
  }

  const handleCloseDialog = () => {
    modalRef.current.close()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const submit = (data: UpdateData) => {
    const updatedData: UpdateData = {
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      telephone: data.telephone !== "" ? data.telephone : undefined,
    }

    updateContact(updatedData, contactId)
  }

  return (
    <li>
      <h3>{contact.name} </h3>
      <p>{contact.id}</p>
      <p>{contact.email}</p>
      <p>{contact.telephone}</p>
      <p>{contact.created_at}</p>
      <button type="button" onClick={() => handleOpenDialog(contact)}>
        Editar
      </button>
      <button type="button" onClick={() => deleteContact(contact.id)}>
        Excluir
      </button>

      <dialog ref={modalRef}>
        <button onClick={handleCloseDialog}>Fechar Modal</button>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <label htmlFor="">Nome</label>
          <input type="text" {...register("name")} />
          {errors.name ? <p>{errors.name.message}</p> : null}

          <label htmlFor="">email</label>
          <input type="text" {...register("email")} />
          {errors.email ? <p>{errors.email.message}</p> : null}

          <label htmlFor="">Telefone</label>
          <input type="text" {...register("telephone")} />
          {errors.telephone ? <p>{errors.telephone.message}</p> : null}

          <button type="submit">Enviar</button>
        </form>
      </dialog>
    </li>
  )
}
