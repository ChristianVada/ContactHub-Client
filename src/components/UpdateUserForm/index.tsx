import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IUpdateUser, UpdateUserSchema } from "../../schemas/UpdateUserSchema"
import { useUserContext } from "../../hooks/useUserContext"
import { StyledForm } from "./style"

interface IUpdateUserFormProps {
  closeDialog: () => void
}

export const UpdateUserForm = ({ closeDialog }: IUpdateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateUser>({ resolver: zodResolver(UpdateUserSchema) })

  const { updateUser } = useUserContext()

  const submit = (data: IUpdateUser) => {
    const updateUserData = {
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      telephone: data.telephone !== "" ? data.telephone : undefined,
      password: data.password !== "" ? data.password : undefined,
    }
    updateUser(updateUserData)
    closeDialog()
  }

  return (
    <StyledForm onSubmit={handleSubmit(submit)} noValidate>
      <label htmlFor="">Nome</label>
      <input type="text" {...register("name")} />
      <p>{errors.name?.message}</p>

      <label htmlFor="">Email</label>
      <input type="text" {...register("email")} />
      <p>{errors.email?.message}</p>

      <label htmlFor="">Telefone</label>
      <input type="text" {...register("telephone")} />
      <p>{errors.telephone?.message}</p>

      <label htmlFor="">Senha</label>
      <input type="text" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit">Enviar</button>
    </StyledForm>
  )
}
