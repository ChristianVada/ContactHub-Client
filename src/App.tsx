import { RoutesMain } from './routes';
import './App.css'
import { UserProvider } from './providers/UserProvider';
import { ContactCardProvider } from './providers/ContactCardProvider';

function App() {

  return (
    <>
      <UserProvider>
        <ContactCardProvider>
          <RoutesMain/>
        </ContactCardProvider>
      </UserProvider>
    </>
  )
}

export default App
