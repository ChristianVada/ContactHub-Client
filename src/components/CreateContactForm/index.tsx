import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  CreateContactSchema,
  ICreateContact,
} from "../../schemas/CreateContactSchema"
import { useContactContext } from "../../hooks/useContactContext"

interface ICreateContactFormProps {
  closeDialog: () => void
}

export const CreateContactForm = ({ closeDialog }: ICreateContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateContact>({
    resolver: zodResolver(CreateContactSchema),
  })

  const { createContact } = useContactContext()

  const submit = (data: ICreateContact) => {
    createContact(data)
    closeDialog()
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
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
    </form>
  )
}
