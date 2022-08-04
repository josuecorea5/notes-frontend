import { createContext, useState, useEffect } from 'react';
import { addNote, deleteNote, getArchivedNotes, getNote, updateNote } from '../services/notes';
import { getCategories, getNotes, archivedNote } from '../services/notes';
import Swal from 'sweetalert2/dist/sweetalert2.all.js'


const NoteContext = createContext();

const NoteProvider = ({children}) => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [noteArchived, setNoteArchived] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [infoNote, setInfoNote] = useState({});
  const [editArchived, setEditArchived] = useState(false);


  const createNewNote = (note, isEdit) => {
    const newNote = [...notes];
    if(!isEdit) {
      addNote(note)
        .then(data => {
          if(data.note) {
            newNote.push(data.note);
            setNotes(newNote)
          }
        })
    }else {
      const {title, content, categoryId, userId} = note;
      const {id} = note;
      updateNote({title,content,categoryId, userId}, id)
        .then(data => {

          if(data && editArchived) {
            const updatedNotes = [...noteArchived];
            const update = updatedNotes.findIndex(el => el.id === id);
            updatedNotes[update] = {id: updatedNotes[update].id, title, content, categoryId}
            setOpenModal(false);
            setIsEdit(false)
            setNoteArchived(updatedNotes);
          }else {
            if(data) {
              const updatedNotes = [...notes];
              const update = updatedNotes.findIndex(el => el.id === id);
              updatedNotes[update] = {id: updatedNotes[update].id, title, content, categoryId}
              setOpenModal(false);
              setIsEdit(false)
              setNotes(updatedNotes);
            }
          }
        })
    }
  }

  const handleDelete = (id, isArchived) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#818CF8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          deleteNote(id)
          .then(data => {
            if(data.note) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              if(!isArchived) {
                const filterNotes = notes.filter(note => note.id !== id);
                setNotes(filterNotes)
              }else {
                const filterNotesArchived = noteArchived.filter(note => note.id !== id);
                setNoteArchived(filterNotesArchived);
              }
            }
          })
          .catch(err => console.log(err))
      }
    })
  }

  const handleEdit = (id, isArchived) => {
    if(isArchived) {
      setEditArchived(true)
    }
    setOpenModal(prevState => !prevState)
    getNote(id)
      .then(data => {
        if(data) {
          setOpenModal(prevState => !prevState)
          setInfoNote(data.note[0])
          setIsEdit(true)
        }
      })
  }

  const handleArchived = (id, isArchived) => {
    const archived = [...noteArchived];
    archivedNote(id)
      .then(data => {
        if(!isArchived) {
          const notArchived = notes.filter(note => note.id !== data.id);
          if(data) {
            archived.push(data);
            setNoteArchived(archived)
            setNotes(notArchived);
          }
        }else {
          const archived = noteArchived.filter(note => note.id !== data.id);
          const isNotArchived = [...notes];
          isNotArchived.push(data);
          setNoteArchived(archived);
          setNotes(isNotArchived);
        }
      });
  }

  useEffect(() => {
    getCategories()
      .then(data => {
        setCategories(data)
      })
    
    getNotes()
      .then(data => {
        const notArchivedNotes = data.notes.filter(note => note.archived === false);
        setNotes(notArchivedNotes);
      })
        
    getArchivedNotes()
      .then(data => {
        if(data) {
          setNoteArchived(data.notes);
        }
      })

  },[])
  return (
    <NoteContext.Provider value={{
      openModal,
      setOpenModal,
      categories,
      notes,
      createNewNote,
      handleDelete,
      handleEdit,
      handleArchived,
      getArchivedNotes,
      noteArchived,
      infoNote,
      isEdit,
      setIsEdit,
      setEditArchived
    }}>
      {children}
    </NoteContext.Provider>
  )
}

export { NoteContext, NoteProvider }