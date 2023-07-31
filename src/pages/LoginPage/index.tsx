import { LoginForm } from "../../components/LoginForm"
import { Link } from "react-router-dom"

export const LoginPage = () => {
  return (
    <main>
      <h1>Login Page</h1>
      <LoginForm />
      <Link to="/register" >Criar nova conta</Link>
    </main>
  )
}
