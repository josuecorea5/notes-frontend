import React from 'react'

export const CreateNoteButton = ({setOpenModal}) => {
  const onCreateNote = () => {
    setOpenModal(prevState => !prevState);
  }
  return (
    <button 
      className='bg-indigo-500 px-3 py-2 rounded-md text-cyan-50 mr-2'
      onClick={onCreateNote}
      >
        Create note
      </button>
  )
}
