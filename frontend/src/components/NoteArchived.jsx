import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import noteIcon from '../assets/notasLittle.png'
import { NoteContext } from '../noteContext/index';
import { MdFileUpload } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

export const NoteArchived = () => {
  const { noteArchived, handleArchived, handleDelete, handleEdit } = useContext(NoteContext);
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/notes');
  }
  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-indigo-500 text-2xl mt-2 ml-3 font-bold'>My Archived notes</div>
        <button className='bg-indigo-500 px-3 py-2 rounded-md text-cyan-50 mt-2 mb-3 mr-2' onClick={goBack}>Volver</button>
      </div>
      <div className='flex justify-end mr-3'>
      </div>
      <div className='grid md:grid-cols-3 gap-2 mb-3 sm:grid-cols-1'>
        { noteArchived &&
          noteArchived.map((note) => (
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
                  <div className='px-2 cursor-pointer' onClick={() => handleArchived(note.id,true)}>
                    <MdFileUpload size={28}/>
                  </div>
                  <div className='px-2 cursor-pointer' onClick={() => handleEdit(note.id,true)}>
                    <FaRegEdit size={28} />
                  </div>
                  <div className='cursor-pointer' onClick={() => handleDelete(note.id, true)}>
                    <MdDeleteOutline size={28}/>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      { noteArchived.length === 0 && <p>You don't have archived notes</p>}
    </div>
  )
}
