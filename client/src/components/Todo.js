import React, {useState, useEffect} from 'react'
import TodoList from "./TodoList"
import Alert from "./Alert"

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
    setName(editItem.title)
  }
  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed")
    setList(list.filter((item) => item.id !== id))
  }
  const clearList = () => {
    showAlert(true, "danger", "Items cleared!")
    setList([])
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <>
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
            <button type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        </form>
        {list.length > 0 && (
          <div style={{marginTop: "2rem"}} className="form-items">
            <TodoList items={list} removeItem={removeItem} editItem={editItem} />
            <div className="center-button">
              <button onClick={clearList}>Clear Items</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Todo