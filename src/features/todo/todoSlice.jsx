// import {createSlice, nanoid} from "@reduxjs/toolkit"
// const initialState={
//     todos:[],
// }

// export const todoSlice=createSlice({
//     name:'todo',
//     initialState,
//     reducers:{
//         addTodo:(state,action)=>{
//      const todo={
//         id:nanoid(),
//         text:action.payload,
//      }
//      state.todos.push(todo)
//         },
//         removeTodo:(state,action)=>{
//             state.todos=state.todos.filter((todo)=>
//             todo.id!=action.payload
//             )
//         } ,
      
      
//     }
// })

// export const {addTodo,removeTodo,updateTodo}=todoSlice.actions

// export default todoSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  todos: [
    {  },
   
  ],
};

// Redux slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a todo
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    // Remove a todo
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Update a todo
    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text !== undefined ? text : existingTodo.text;
        existingTodo.completed = completed !== undefined ? completed : existingTodo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
