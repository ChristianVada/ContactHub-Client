import { useForm } from "react-hook-form"
import { LoginData, schema } from "./validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUserContext } from "../../hooks/useUserContext"

export const LoginForm = () => {
  const {register, handleSubmit} = useForm<LoginData>({resolver: zodResolver(schema)})

  const {loginUser} = useUserContext()

  return(
    <form onSubmit={handleSubmit(loginUser)}>
      <label htmlFor="">Email</label>
      <input type="text" placeholder="insira seu email" {...register("email")} />

      <label htmlFor="">Senha</label>
      <input type="text" placeholder="insira sua senha" {...register("password")} />

      <button type="submit">Enviar</button>
    </form>
  )
}
