import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface IContact {
  id: string
  name: string
  email: string
  telephone: string
  created_at: string
} 

interface IContactCardProviderProps {
  children: ReactNode
}

interface IContactCardContext {
  contactList: IContact[]
  setContactList: React.Dispatch<React.SetStateAction<IContact[]>>
}

export const ContactCardContext = createContext<IContactCardContext>({} as IContactCardContext)

export const ContactCardProvider = ({children}: IContactCardProviderProps) => {
  const [contactList, setContactList] = useState<IContact[]>([])
  
  useEffect(() => {
    const loadContactList = async () => {
      try {
        const response = await api.get("/contacts")
        setContactList(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadContactList()
  },[]) 

  return(
    <ContactCardContext.Provider value={{contactList, setContactList}} >
      {children}
    </ContactCardContext.Provider>
  )
}