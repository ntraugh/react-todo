import React from 'react'
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa"

const TodoList = ({items, removeItem, editItem}) => {
  return (
    <div className='todo-list'>
        {items.map((item) => {
            const {id, title} = item
            return (
                <ul className='todo-group' key={id}>
                    <li className='single-todo'>
                        {title}
                        <div style={{float: "right"}}>
                            <button type='button' className='edit-button' onClick={() => editItem(id)}>
                                <FaPencilAlt />
                            </button>
                            <button type='button' className='remove-button' onClick={() => removeItem(id)}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    </li>
                </ul>
            )
        })}
    </div>
  )
}

export default TodoList