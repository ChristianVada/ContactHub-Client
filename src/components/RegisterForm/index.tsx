import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IRegisters, RegisterSchema } from "../../schemas/RegisterSchema"
import { useUserContext } from "../../hooks/useUserContext"

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisters>({
    resolver: zodResolver(RegisterSchema),
  })

  const { createUser } = useUserContext()

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <label htmlFor="nome">Nome</label>
      <input id="nome" type="text" {...register("name")} />
      <p>{errors.name?.message}</p>

      <label htmlFor="email">Email</label>
      <input id="email" type="text" {...register("email")} />
      <p>{errors.email?.message}</p>

      <label htmlFor="senha">Senha</label>
      <input id="senha" type="text" {...register("password")} />
      <p>{errors.password?.message}</p>

      <label htmlFor="tel">Numero de contato</label>
      <input id="tel" type="text" {...register("telephone")} />
      <p>{errors.telephone?.message}</p>

      <button type="submit">Criar conta</button>
    </form>
  )
}
