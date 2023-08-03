import { RoutesMain } from "./routes"
import { UserProvider } from "./contexts/UserContext"
import { ContactProvider } from "./contexts/ContactContext"
import { Normalize } from "./styles/Normalize"
import { PartialReset } from "./styles/PartialReset"
// import "./App.css"

function App() {
  return (
    <>
      <Normalize />
      <PartialReset />
      <UserProvider>
        <ContactProvider>
          <RoutesMain />
        </ContactProvider>
      </UserProvider>
    </>
  )
}

export default App
