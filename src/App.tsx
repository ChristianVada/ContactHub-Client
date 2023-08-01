import { RoutesMain } from './routes';
import './App.css'
import { UserProvider } from './contexts/UserContext';
import { ContactProvider } from './contexts/ContactContext';

function App() {

  return (
    <>
      <UserProvider>
        <ContactProvider>
          <RoutesMain/>
        </ContactProvider>
      </UserProvider>
    </>
  )
}

export default App
