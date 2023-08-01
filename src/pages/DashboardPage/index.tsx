import { ContactList } from "../../components/ContactList"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./validator"
import { useContactContext } from "../../hooks/useContactContext"
import { useRef } from "react"

export const DashboardPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const { createContact } = useContactContext()

  const modalRef = useRef(null)

  const handleOpenDialog = () => {
    modalRef.current.showModal()
  }

  const handleCloseDialog = () => {
    modalRef.current.close()
  }

  return (
    <div>
      <h1>Dashboard page</h1>

      <button onClick={handleOpenDialog}>Criar contato</button>

      <dialog ref={modalRef}>
        <button onClick={handleCloseDialog}>Fechar Modal</button>
        <form onSubmit={handleSubmit(createContact)} noValidate>
          <label htmlFor="">Nome</label>
          <input type="text" {...register("name")} />
          {errors.name ? <p>{errors.name.message}</p> : null}

          <label htmlFor="">email</label>
          <input type="text" {...register("email")} />
          {errors.email ? <p>{errors.email.message}</p> : null}

          <label htmlFor="">Telefone</label>
          <input type="text" {...register("telephone")} />
          {errors.telephone ? <p>{errors.telephone.message}</p> : null}

          <button type="submit">Enviar</button>
        </form>
      </dialog>

      <ContactList
        modalRef={modalRef}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  )
}
