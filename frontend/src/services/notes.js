import axios from "axios"
const BASE_URL = 'http://localhost:3000'
export const login = async (email, password) => {
    const response = await  axios.post(`${BASE_URL}/login/auth`,{email: email, password: password})
    if(response.status === 200) {
      return response.data
    }else {
      const error = await response.json();
      console.log('Hello', error.message);
    }
}

export const getNotes = async () => {
  const response = await axios(`${BASE_URL}/notes`);
  return response.data;
}

export const getNote = async(id) => {
  const response = await axios.get(`${BASE_URL}/notes/${id}`);
  if(response.status === 200) {
    return response.data;
  }
}

export const getCategories = async() => {
  const response = await axios(`${BASE_URL}/categories`);
  return response.data.categories;
}

export const addNote = async(note) => {
  const response = await axios.post(`${BASE_URL}/notes`, note);
  if(response.status === 201) {
    return response.data;
  }
}

export const deleteNote = async(id) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`);
  if(response.status === 200) {
    return response.data;
  }
}

export const updateNote = async(note,id) => {
  const response = await axios.put(`${BASE_URL}/notes/${id}`, note)
  if(response.status === 201) {
    return response.data;
  }
}

export const archivedNote = async(id) => {
  const response = await axios.post(`${BASE_URL}/notes/archived/${id}`);
  if(response.status === 201) {
    return response.data;
  }
}

export const getArchivedNotes = async() => {
  const response = await axios.get(`${BASE_URL}/notes/archived`);
  if(response.status === 200){
    return response.data;
  }
}