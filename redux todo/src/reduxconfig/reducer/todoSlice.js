import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "Todos",
  initialState: {
    todo: []
  },
  reducers: {
    addTodo: (state, action) => {
      // state ka matlb initial state
      state.todo.push({
        title: action.payload.title,
        id: nanoid()
      });
    },
    removeTodo: (state, action) => {
      state.todo.splice(action.payload.index, 1);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todo.find((item) => item.id === id);
      if (todo) {
        todo.title = title; // Update the todo's title
      }
    }
  }
}); // Yahan missing curly brace thi!

// Actions ko export karna
export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;