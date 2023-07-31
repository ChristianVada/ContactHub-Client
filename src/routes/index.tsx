import {Route, Routes} from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { DashboardPage } from "../pages/DashboardPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ProtectedRoutes } from "./ProtectedRoutes"


export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element = {<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route element = {<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Route>
    </Routes>
  )
}