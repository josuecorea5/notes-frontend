import { useContext } from 'react';
import { Navbar } from './pages/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './components/Login'
import { Notes } from './components/Notes';
import { Modal } from './components/Modal';
import { CreateNote } from './components/CreateNote';
import { NoteContext } from '../src/noteContext/index'
import { NoteArchived } from './components/NoteArchived';
import { EditNote } from './components/EditNote';

function App() {
  const { openModal,isEdit } = useContext(NoteContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/notes/archived' element={<NoteArchived />} />
      </Routes>
      {
        !!openModal && (
          <Modal>
            <CreateNote/>
          </Modal>
        )
      }
      {
        isEdit && (
          <Modal>
            <EditNote />
          </Modal>
        )
      }
    </BrowserRouter>
  )
}

export default App
