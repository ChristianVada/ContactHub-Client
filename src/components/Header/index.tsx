import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../hooks/useUserContext"
import { UpdateUserForm } from "../UpdateUserForm"
import { useDialog } from "../../hooks/useDialog"
import { StyledHeader } from "./style"

export const Header = () => {
  const navigate = useNavigate()

  const { user, setUser, deleteUser } = useUserContext()

  const logout = () => {
    setUser(null)
    localStorage.removeItem("@agenda:token")
    navigate("/")
  }

  const { closeDialog, dialogRef, openDialog } = useDialog()

  return (
    <StyledHeader>
      <div>
        <h2>Olá {user?.name}</h2>
        <p>Email: {user?.email}</p>
        <p>Telefone: {user?.telephone}</p>
        <p>Conta criada em: {user?.created_at}</p>
      </div>

      <div>
        <button type="button" onClick={openDialog}>
          Editar informações
        </button>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <dialog ref={dialogRef}>
        <button onClick={closeDialog}>Fechar Modal</button>
        <UpdateUserForm closeDialog={closeDialog} />
        <button type="button" onClick={deleteUser}>
          Deletar conta
        </button>
      </dialog>
    </StyledHeader>
  )
}
