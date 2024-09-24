import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo , editTodo } from './reduxconfig/reducer/todoSlice'

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const todoVal = useRef();

  // dispatch
  const dispatch = useDispatch();

  // selector
  const selector = useSelector(state => state.todos.todo);
  console.log(selector);

  const addTodoInRedux = (event) => {
    event.preventDefault();
    if (isEditing && currentTodo !== null) {
      // Handle edit by dispatching the editTodo action
      dispatch(editTodo({
        id: currentTodo.id,
        title: todoVal.current.value
      }));
      setIsEditing(false);
      setCurrentTodo(null);
    } else {
      dispatch(addTodo({
        title: todoVal.current.value
      }));
    }
    todoVal.current.value = ''; // Clear input after add/edit
  }

  const editItem = (item) => {
    setIsEditing(true);
    setCurrentTodo(item);
    todoVal.current.value = item.title; // Populate input with current todo for editing
  }

  const deleteItemFromRedux = (index) => {
    console.log("delete item", index);
    dispatch(removeTodo({
      index
    }));
  }

  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Todo App Using Redux</h1>

      <form className="mb-4 w-full max-w-lg flex space-x-3">
        <input type="text" ref={todoVal} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Add your todo..." />
        <button onClick={addTodoInRedux} className="px-3 py-1 bg-red-500 text-white rounded-md ">
          {isEditing ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      <ul className="w-full max-w-lg">
        {selector.length > 0 ? selector.map((item, index) => (
          <li key={item.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded-md shadow-sm">
            <span className="text-lg">{item.title}</span>
            <div className="space-x-2">
              <button onClick={() => editItem(item)} className="px-3 py-1 bg-yellow-400 text-white rounded-md ">Edit</button>
              <button onClick={() => deleteItemFromRedux(index)} className="px-3 py-1 bg-red-500 text-white rounded-md">Delete</button>
            </div>
          </li>
        )) : <h1 className="text-xl text-gray-500">No data found</h1>}
      </ul>
    </div>
  )
}

export default App;