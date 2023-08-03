import { ReactNode, createContext, useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"

interface IUserProviderProps {
  children: ReactNode
}

interface IUser {
  id: string
  name: string
  email: string
  telephone: string
  created_at: string
}

interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  loginUser: (data: object) => Promise<void>
  createUser: (data: object) => Promise<void>
  readUser: () => Promise<void>
  updateUser: (data: object) => Promise<void>
  deleteUser: () => Promise<void>
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)

  const navigate = useNavigate()

  const loginUser = async (data: object) => {
    try {
      const response = await api.post("/login", data)
      const token = response.data.token
      // api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem("@agenda:token", token)
      navigate("dashboard")
      readUser()
    } catch (error) {
      console.log(error)
      // alert(`${error.response.data.message}`)
    }
  }

  const createUser = async (data: object) => {
    try {
      await api.post("/users", data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const readUser = async () => {
    try {
      const token = localStorage.getItem("@agenda:token")

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (data: object) => {
    try {
      const token = localStorage.getItem("@agenda:token")
      await api.patch("/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      readUser()
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
      await api.delete("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        createUser,
        readUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
