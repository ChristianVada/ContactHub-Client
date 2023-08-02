import { ContactList } from "../../components/ContactList"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./validator"
import { useContactContext } from "../../hooks/useContactContext"
import { useRef } from "react"
import { useUserContext } from "../../hooks/useUserContext"

export const DashboardPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(/* {
    resolver: zodResolver(schema),
  } */)

  const submit = (data) => {
    console.log(data)
    const updateUserData = {
      name: data.name !== "" ? data.name : undefined,
      email: data.email !== "" ? data.email : undefined,
      telephone: data.telephone !== "" ? data.telephone : undefined,
      password: data.password !== "" ? data.password : undefined,
    }
    updateUser(updateUserData)
  }

  const { createContact } = useContactContext()

  const { user, deleteUser, updateUser } = useUserContext()

  const modalRef = useRef(null)

  const modalRefUser = useRef(null)

  const handleOpenDialogUser = () => {
    modalRefUser.current.showModal()
  }

  const handleCloseDialogUser = () => {
    modalRefUser.current.close()
  }

  const handleOpenDialog = () => {
    modalRef.current.showModal()
  }

  const handleCloseDialog = () => {
    modalRef.current.close()
  }

  return (
    <div>
      <h1>Dashboard page</h1>
      <h2>Bem vindo {user.name}</h2>

      <div>
        <button onClick={handleOpenDialogUser}>Editar informaçoes</button>
        <dialog ref={modalRefUser}>
          <button onClick={handleCloseDialogUser}>Fechar Modal</button>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <label htmlFor="">Nome</label>
            <input type="text" {...register("name")} />
            {errors.name ? <p>{errors.name.message}</p> : null}

            <label htmlFor="">email</label>
            <input type="text" {...register("email")} />
            {errors.email ? <p>{errors.email.message}</p> : null}

            <label htmlFor="">Telefone</label>
            <input type="text" {...register("telephone")} />
            {errors.telephone ? <p>{errors.telephone.message}</p> : null}

            <label htmlFor="">Senha</label>
            <input type="text" {...register("password")} />
            {errors.password ? <p>{errors.password.message}</p> : null}

            <button type="submit">Enviar</button>
          </form>
          <button type="button" onClick={deleteUser}>
            Deletar conta
          </button>
        </dialog>
      </div>

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
