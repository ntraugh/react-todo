import React, {useState, useEffect} from 'react'
import TodoList from "./TodoList"
import Alert from "./Alert"
import {useNavigate} from "react-router-dom"

const getLocalStorageItems = () => {
  let list = localStorage.getItem("list")
  if(list) {
    return (list = JSON.parse(localStorage.getItem("list")))
  }
  else {
    return []
  }

}

const Todo = () => {
  const [name, setName] = useState([])
  const [list, setList] = useState(getLocalStorageItems())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show: false, message: "", type: ""})
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name) {
      showAlert(true, "danger", "Please enter a value")
    }
    else if(name && isEditing){
      setList(list.map((item) => {
        if(item.id === editId) {
          return {...item, title: name}
        }
        return item
      }))
      setName("")
      setEditId(null)
      setIsEditing(false)
      showAlert(true, "success", "Item succesfully changed!")
    }
    else {
      showAlert(true, "success", "Item added succesfully!")
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName("")
    }
  }


  const showAlert = (show=false, type="", message="") => {
    setAlert({show, type, message})

  }
  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(itemToEdit.title)
  }
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed")
    setList(list.filter((item) => item.id !== id))
  }
  const clearList = () => {
    showAlert(true, "danger", "Items cleared!")
    setList([])
  }

  const logout = () => {
    navigate("/")
    // we would also setUserInfo({ email: "", password: ""})
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <>
      <button 
      onClick={logout}
      style={{float: "right", margin: "1rem 1rem", width: "5%"}}>Logout</button>
      <section className="whole-form">
        <form onSubmit={handleSubmit} className="form-info">
          <h3 style={{marginBottom: "1.5rem", textAlign: "center"}}>My To-Do List</h3>
          <div className="todo-input">
            <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text" 
            className="" 
            placeholder="Create a todo item!">
            </input>
            <button type="submit" style={{width: "25%"}}>
              {isEditing ? "Edit" : "Add"}
            </button>
          </div>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        </form>
        {list.length > 0 ? (
          <div style={{marginTop: "2rem"}} className="form-items">
            <TodoList items={list} removeItem={removeItem} editItem={editItem} />
            <div className="center-button">
              <button 
              style={{width: "25%", padding:".5rem"}}
              onClick={clearList}>Clear Items</button>
            </div>
          </div>
        ) : <p 
        style={{display: "flex", justifyContent: "center"}}>Add something to do!</p>}
      </section>
    </>
  )
}

export default Todo