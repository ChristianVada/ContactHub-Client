import { RegisterForm } from "../../components/RegisterForm"
import { Link } from "react-router-dom"
import { StyledMain } from "./style"

export const RegisterPage = () => {
  return (
    <StyledMain>
      <h1>Cadastre-se</h1>
      <RegisterForm />
      <Link to="/">Retornar para login</Link>
    </StyledMain>
  )
}
