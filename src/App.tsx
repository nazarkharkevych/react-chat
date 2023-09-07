import './App.scss';
import { Outlet } from 'react-router-dom';
import { Chat } from './components/Chat';
import { MessagesProvider } from './hooks/MessagesProvider';
import { useState } from 'react';
import { LoggedUser } from './types/LoggedUser';
import { GoogleLoginProvider } from './components/GoogleLoginProvider';

function App() {
  const [user, setUser] = useState<LoggedUser | null>(null);

  return (
      <div className="App">
        {!user
          ? <GoogleLoginProvider onSetUser={setUser} />
          : (
            <MessagesProvider>
              <Chat loggedUser={user} onLogout={setUser} />

              <Outlet />
            </MessagesProvider>
          )}
      </div>
  );
};

export default App;
