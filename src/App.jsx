import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'

import './App.css'
import MyAppBar from './components/MyAppBar'
import { Container } from '@mui/material'
import SongView from './pages/SongView'
import NewSong from './pages/NewSong'
import EditSong from './pages/EditSong'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <MyAppBar/>
          <Container>          
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/songs/:id" element={<SongView />} />
              <Route path="/newSong" element={<NewSong />}/>
              <Route path="/edit/:id" element={<EditSong />}/>
            </Routes>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
