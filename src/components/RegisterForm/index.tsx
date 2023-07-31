import {useForm} from "react-hook-form"

export const RegisterForm = () => {
  const {register, handleSubmit} = useForm()

  const submit = (formData) => {
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor="">Nome</label>
      <input type="text" {...register("name")} />

      <label htmlFor="">Email</label>
      <input type="text" {...register("email")} />
      
      <label htmlFor="">Senha</label>
      <input type="text" {...register("password")} />

      <label htmlFor="">Numero de contato</label>
      <input type="text" {...register("telephone")} />

      <button type="submit">Criar conta</button>
    </form>
  )
}