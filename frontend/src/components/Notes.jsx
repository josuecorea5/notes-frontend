import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import noteIcon from '../assets/notasLittle.png'
import { getNotes } from '../services/notes';
import { BiArchiveIn } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { CreateNoteButton } from './CreateNoteButton';
import { NoteContext } from '../noteContext/index';
import Swal from 'sweetalert2/dist/sweetalert2.all.js'

export const Notes = () => {
  const {setOpenModal, notes, handleDelete, handleEdit, handleArchived, archivedNotes, getArchivedNotes} = useContext(NoteContext);
  const navigate = useNavigate();
  const goToArchivedNotes = () => {
    getArchivedNotes()
    navigate('/notes/archived');
  }

  return (
    <div>
      <h2 className='mb-5 text-3xl mr-5 text-center text-indigo-500 font-bold'>My notes</h2>  
      <div className='mb-5 flex justify-end mr-3'>
        <CreateNoteButton setOpenModal={setOpenModal}/>
        <button className='bg-indigo-500 px-3 py-2 rounded-md text-cyan-50 mr-2' onClick={goToArchivedNotes}>Archived notes</button>
      </div>
      <div className='grid md:grid-cols-3 gap-2 mb-3 sm:grid-cols-1'>
        {
          notes.map((note,index) => (
            <div className='max-w-sm justify-between shadow-md rounded-md p-3 ml-3 bg-indigo-400' key={note.id}>
              <div className='flex'>
                <img src={noteIcon} alt="icon notes" className='' />
                <div className='ml-2'>
                  <p className='font-bold'>{note.title}</p>
                  <p>{note.content}</p>
                </div>
              </div>
              <div className='flex justify-end items-end content-center mt-2'>
                <div className='flex'>
                  <div className='px-2 cursor-pointer' onClick={() => handleArchived(note.id, false)}>
                    <BiArchiveIn size={28}/>
                  </div>
                  <div className='px-2 cursor-pointer' onClick={() => handleEdit(note.id,false)}>
                    <FaRegEdit size={28} />
                  </div>
                  <div className='cursor-pointer' onClick={() => handleDelete(note.id, false)}>
                    <MdDeleteOutline size={28}/>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
