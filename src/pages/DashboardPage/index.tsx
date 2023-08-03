import { ContactList } from "../../components/ContactList"
import { useContactContext } from "../../hooks/useContactContext"
import { useEffect } from "react"
import { useUserContext } from "../../hooks/useUserContext"
import { Header } from "../../components/Header"
import { useDialog } from "../../hooks/useDialog"
import { CreateContactForm } from "../../components/CreateContactForm"
import { StyledMain } from "./style"

export const DashboardPage = () => {
  const { readContactList } = useContactContext()

  const { readUser } = useUserContext()

  const { closeDialog, dialogRef, openDialog } = useDialog()

  useEffect(() => {
    readUser()
    readContactList()
  }, [])

  return (
    <StyledMain>
      <Header />
      <h1>Dashboard page</h1>
      <button onClick={openDialog}>Criar contato</button>

      <dialog ref={dialogRef}>
        <button onClick={closeDialog}>Fechar Modal</button>
        <CreateContactForm closeDialog={closeDialog} />
      </dialog>

      <ContactList />
    </StyledMain>
  )
}
