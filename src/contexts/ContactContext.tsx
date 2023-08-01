import { ReactNode, createContext, useEffect, useState } from "react"
import { api } from "../services/api"

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
  createContact: (data: type) => Promise<void>
  updateContact: (data: type, contactId: string) => Promise<void>
  deleteContact: (contactId: string) => Promise<void>
}

export const ContactContext = createContext<IContactContext>(
  {} as IContactContext
)

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contactList, setContactList] = useState<IContact[]>([])

  const loadContactList = async () => {
    try {
      const response = await api.get("contacts")
      setContactList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadContactList()
  }, [])

  const createContact = async (data: type) => {
    try {
      const response = await api.post("/contacts", data)
      loadContactList()
    } catch (error) {
      console.log(error)
    }
  }

  const updateContact = async (data: type, contactId: string) => {
    try {
      const response = await api.patch(`/contacts/${contactId}`, data)
      loadContactList()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteContact = async (contactId: string) => {
    try {
      const response = await api.delete(`/contacts/${contactId}`)
      loadContactList()
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
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}
