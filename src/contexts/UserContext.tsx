import { ReactNode, createContext, useEffect, useState } from "react"
import { LoginData } from "../components/LoginForm/validator"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"

interface IUserProviderProps {
  children: ReactNode
}

interface IUserContext {
  loginUser: (data: LoginData) => Promise<void>
  loading: boolean
  getUser: () => Promise<void>
  user: object
  updateUser: Promise<void>
  deleteUser: Promise<void>
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("@agenda:token")

    if (!token) {
      setLoading(false)
      return
    } else {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setLoading(false)
      getUser()
    }
  }, [])

  const getUser = async () => {
    try {
      const response = await api.get("/users")
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async (data: LoginData) => {
    try {
      const response = await api.post("/login", data)
      const { token } = response.data
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem("@agenda:token", token)
      setLoading(false)
      navigate("dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem("@agenda:token")
      const response = await api.patch("/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("@agenda:token")
      if (!token) {
        console.log("Token not found.")
        return
      }

      const response = await api.delete("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{ loginUser, loading, getUser, user, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
