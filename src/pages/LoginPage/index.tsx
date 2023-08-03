import { LoginForm } from "../../components/LoginForm"
import { Link } from "react-router-dom"
import { StyledMain } from "./style"

export const LoginPage = () => {
  return (
    <StyledMain>
      <h1>Login Page</h1>
      <LoginForm />
      <Link to="/register">Criar nova conta</Link>
    </StyledMain>
  )
}
