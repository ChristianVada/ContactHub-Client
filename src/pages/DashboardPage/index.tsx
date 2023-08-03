import { ContactList } from "../../components/ContactList"
import { useContactContext } from "../../hooks/useContactContext"
import { useEffect } from "react"
import { useUserContext } from "../../hooks/useUserContext"
import { Header } from "../../components/Header"
import { useDialog } from "../../hooks/useDialog"
import { CreateContactForm } from "../../components/CreateContactForm"

export const DashboardPage = () => {
  const { readContactList } = useContactContext()

  const { readUser } = useUserContext()

  const { closeDialog, dialogRef, openDialog } = useDialog()

  useEffect(() => {
    readUser()
    readContactList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <Header />
      <h1>Dashboard page</h1>
      <button onClick={openDialog}>Criar contato</button>

      <dialog ref={dialogRef}>
        <CreateContactForm closeDialog={closeDialog} />
        <button onClick={closeDialog}>Fechar Modal</button>
      </dialog>

      <ContactList />
    </main>
  )
}
