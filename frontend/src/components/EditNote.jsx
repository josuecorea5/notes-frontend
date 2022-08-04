import React, {useContext, useState} from 'react'
import { addNote } from '../services/notes';
import { NoteContext } from '../noteContext/index'

export const EditNote = () => {
  const {setOpenModal, categories, createNewNote, infoNote,setIsEdit,setEditArchived} = useContext(NoteContext);
  const [listCategory, setListCategory] = useState('');
  const [error, setError] = useState({isError: false, message: ''});
  const [optionCategory, setOptionCategory] = useState('');
  const [note, setNote] = useState({
    title: infoNote.title,
    content: infoNote.content,
    categoryId: infoNote.categoryId,
    userId: infoNote.userId,
    id: infoNote.id
  });
  const closeModal = () => {
    setEditArchived(false)
    setOpenModal(false);
    setIsEdit(false)
  }

  const hadleCategory = (e) => {
    setOptionCategory(e.target.value)
  }

  const addCategory = (e) => {
    e.preventDefault();
    console.log(optionCategory)
    setListCategory(optionCategory);
  }

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
    console.log(note)
  }
  const updatedNote = (e) => {
    e.preventDefault();
    if(note.title === '' || note.content === '' || note.categoryId === '') {
      setError({isError: true, message: 'all fields are required'});
      return;
    }else if (note.content.length < 5) {
      setError({isError: true, message: 'content length must be 5 characters'})
    }else {
      setError({isError: false, message: ''});
    }
    createNewNote(note, true);
    setOpenModal(false);
  }

  return (
    <div>
      <form action="" className='shadow-sm border bg-slate-200 p-4 rounded-md' onSubmit={updatedNote}>
        <div>
          <label htmlFor="" className='text-zinc-600'>
            Title
            <input type="text" placeholder='Note' name='title' value={note.title} className='ml-10 outline-none bg-slate-300 p-1 text-gray-500 ' onChange={handleChange} />
          </label>
        </div>
        <div className='flex mt-4'>
          <label htmlFor="" className='text-zinc-600'>
            Content
          </label>
          <textarea className='ml-3 text-gray-500 outline-none bg-slate-300 p-2' name="content" id="" cols="30" rows="10" value={note.content} onChange={handleChange}></textarea>
        </div>
        <div className='mt-2'>
          <label htmlFor="" className='text-zinc-600'>
            Categories
          </label>
        </div>
        <div className='flex'>
          <div className='w-full'>
            <select className='w-full p-2 rounded-sm text-zinc-600 bg-slate-300' name="categoryId" id="" onChange={handleChange}>
              <option value="">{infoNote.category.name}</option>
              {
                categories.map(category =>(
                  <option key={category.id} value={category.id}>{category.name}</option>
                  )
                )
              }
            </select>
          </div>
        </div>
        {error.isError && (
          <div className='mt-4 bg-red-500 p-1'>
            <p className='text-cyan-100 text-center'>{error.message}</p>
          </div>
        )}
        <div className='mt-5 flex justify-end'>
          <button 
            className='text-cyan-50 bg-indigo-500 px-4 py-2 rounded-md mr-3'
            onClick={closeModal}
            >
              Cancel
          </button>
          <button className='text-cyan-50 bg-indigo-500 px-4 py-2 rounded-md'>Save</button>
        </div>
      </form>
    </div>
  )
}
