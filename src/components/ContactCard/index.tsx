import { useForm } from "react-hook-form"
import { IContact } from "../../contexts/ContactContext"
import { useContactContext } from "../../hooks/useContactContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useDialog } from "../../hooks/useDialog"
import {
  IUpdateContact,
  UpdateContactSchema,
} from "../../schemas/UpdateContactSchema"
import { StyledLi } from "./style"
import { StyledForm } from "../LoginForm/style"

interface IContactProps {
  contact: IContact
}

export const ContactCard = ({ contact }: IContactProps) => {
  const { updateContact, deleteContact } = useContactContext()

  const { closeDialog, dialogRef, openDialog } = useDialog()

  const [contactId, setContactId] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateContact>({
    resolver: zodResolver(UpdateContactSchema),
  })

  const submit = (data: IUpdateContact) => {
    const updatedData: IUpdateContact = {
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      telephone: data.telephone !== "" ? data.telephone : undefined,
    }
    updateContact(updatedData, contactId)
    closeDialog()
  }

  return (
    <StyledLi>
      <h3>{contact.name} </h3>
      <p>{contact.email}</p>
      <p>{contact.telephone}</p>
      <p>{contact.created_at}</p>
      <button
        type="button"
        onClick={() => {
          openDialog()
          setContactId(contact.id)
        }}
      >
        Editar
      </button>
      <button type="button" onClick={() => deleteContact(contact.id)}>
        Excluir
      </button>

      <dialog ref={dialogRef}>
        <button onClick={closeDialog}>Fechar Modal</button>
        <StyledForm onSubmit={handleSubmit(submit)} noValidate>
          <label htmlFor="">Nome</label>
          <input type="text" {...register("name")} />
          <p>{errors.name?.message}</p>

          <label htmlFor="">email</label>
          <input type="text" {...register("email")} />
          <p>{errors.email?.message}</p>

          <label htmlFor="">Telefone</label>
          <input type="text" {...register("telephone")} />
          <p>{errors.telephone?.message}</p>

          <button type="submit">Enviar</button>
        </StyledForm>
      </dialog>
    </StyledLi>
  )
}
