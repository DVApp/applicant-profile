import { createContext, useState } from 'react';
import './App.css';
import Profiles from './Components/profile';
export const ProfileContext = createContext();
function App() {
  const [userData, setUserData] = useState({ list: [] });

  return (
    <div className="App">
      <div className="container-fluid profile-menu">
        <ProfileContext.Provider value={{ setUserData, userData }}>
          <Profiles></Profiles>
        </ProfileContext.Provider>
      </div>
    </div>
  );
}

export default App;
