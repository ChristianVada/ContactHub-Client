import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../components/LoginForm/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface IUserProviderProps {
  children: ReactNode
}

interface IUserContext {
  loginUser: (data: LoginData) => Promise<void>
  loading: boolean
}

export const UserContext = createContext<IUserContext>({} as IUserContext )

export const UserProvider = ({children} : IUserProviderProps) => {
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("@agenda:token")

    if (!token){
      setLoading(false)
      return
    } else {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setLoading(false)
    }


  }, [])

  const loginUser = async (data: LoginData) =>  {
    try {
      const response = await api.post("/login", data)
      const {token} = response.data
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem("@agenda:token", token)
      setLoading(false)
      navigate("dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={{loginUser,loading}} >
      {children}
    </UserContext.Provider>
  )
}