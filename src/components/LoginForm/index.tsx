import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUserContext } from "../../hooks/useUserContext"
import { ILogin, LoginSchema } from "../../schemas/LoginSchema"
import { StyledForm } from "./style"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  })

  const { loginUser } = useUserContext()

  return (
    <StyledForm onSubmit={handleSubmit(loginUser)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        placeholder="insira seu email"
        {...register("email")}
      />
      <p>{errors.email?.message}</p>

      <label htmlFor="senha">Senha</label>
      <input
        id="senha"
        type="text"
        placeholder="insira sua senha"
        {...register("password")}
      />
      <p>{errors.password?.message}</p>

      <button type="submit">Entrar</button>
    </StyledForm>
  )
}
