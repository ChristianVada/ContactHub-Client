import { ReactNode, createContext, useState } from "react"
import { api } from "../services/api"
import { ICreateContact } from "../schemas/CreateContactSchema"
import { IUpdateContact } from "../schemas/UpdateContactSchema"

export interface IContact {
  id: string
  name: string
  email: string
  telephone: string
  created_at: string
}

interface IContactProviderProps {
  children: ReactNode
}

interface IContactContext {
  contactList: IContact[]
  setContactList: React.Dispatch<React.SetStateAction<IContact[]>>
  createContact: (data: ICreateContact) => Promise<void>
  updateContact: (data: IUpdateContact, contactId: string) => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
  readContactList: () => Promise<void>
}

export const ContactContext = createContext<IContactContext>(
  {} as IContactContext
)

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contactList, setContactList] = useState<IContact[]>([])

  const readContactList = async () => {
    try {
      const token = localStorage.getItem("@agenda:token")
      const response = await api.get("contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setContactList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createContact = async (data: ICreateContact) => {
    try {
      const token = localStorage.getItem("@agenda:token")
      await api.post("/contacts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      readContactList()
    } catch (error) {
      console.log(error)
    }
  }

  const updateContact = async (data: IUpdateContact, contactId: string) => {
    try {
      const token = localStorage.getItem("@agenda:token")
      await api.patch(`/contacts/${contactId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      readContactList()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteContact = async (contactId: string) => {
    try {
      const token = localStorage.getItem("@agenda:token")
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      readContactList()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContactContext.Provider
      value={{
        contactList,
        setContactList,
        createContact,
        updateContact,
        deleteContact,
        readContactList,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}
