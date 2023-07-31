import { RegisterForm } from "../../components/RegisterForm"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
  return (
    <div>
      <h1>Cadastre-se</h1>
      <RegisterForm/>
      <Link to="/" >Retornar para login</Link>
    </div>
  )
}