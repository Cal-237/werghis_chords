import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'

import './App.css'
import MyAppBar from './components/MyAppBar'
import { Container } from '@mui/material'
import SongView from './pages/SongView'
import NewSong from './pages/NewSong'
import EditSong from './pages/EditSong'
import { useState, useEffect } from 'react'

import { db, auth } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // user got logged in
        // check if user is authorized
        const docRef = doc(db, "authorizedUsers", user.uid);
        const DBAuthorized = (await getDoc(docRef)).exists();

        setAuthorized(DBAuthorized);
      } else {
        // User got signed out
        setAuthorized(false);
      }
    });
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <MyAppBar authorized={authorized}/>
          <Container>          
            <Routes>
              <Route index element={<Homepage authorized={authorized}/>} />
              <Route path="/songs/:id" element={<SongView authorized={authorized}/>} />
              <Route path="/newSong" element={<NewSong />}/>
              <Route path="/edit/:id" element={<EditSong />}/>
            </Routes>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
