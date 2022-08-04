import React from "react";
import ReactDOM from "react-dom";

const Modal = ({children}) => {
  return ReactDOM.createPortal(
    <div className="bg-slate-300 fixed -top-10 -left-10 -right-0 -bottom-2 flex justify-center items-center text-cyan-100">
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export { Modal }