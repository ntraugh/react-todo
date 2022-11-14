import React, {useState, useEfect} from 'react'
import TodoList from "./TodoList"
import Alert from "./Alert"

const Todo = () => {
  const [name, setName] = useState([])
  const [list, setList] = useState([])
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
  const editItem = () => {

  }
  const removeItem = () => {

  }
  const clearList = () => {

  }


  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3 style={{marginBottom: "1.5rem", textAlign: "center"}}>My To-Do List</h3>
          <div className="">
            <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text" 
            className="todo-input" 
            placeholder="Create a todo item!">
            </input>
            <button type="submit">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div style={{marginTop: "2rem"}}>
            <TodoList items={list} removeItem={removeItem} editItem={editItem} />
            <div>
              <button onClick={clearList}>Clear Items</button>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default Todo