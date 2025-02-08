import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const Addtodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
  if(input =="") { alert("Add task")}
     else{ e.preventDefault();
      dispatch(addTodo(input));
      setInput("");}
    
  };
  return (
    <div>
      {/* <form className="bg-white shadow-md w-[75%] mx-auto mt-10  overflow-auto rounded-md flex justify-between absolute top-60  items-center left-1/4 px-2">
        <img className="w-4 mr-2" src="https://cdn-icons-png.flaticon.com/128/10337/10337471.png" alt="" />
        <input
          className="h-12 outline-none w-[94%] placeholder:text-blue-600"
          type="text"
          placeholder="Add a Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
         
        />
        <button
          className="border h-8 w-16  rounded-md bg-green-300"
          onClick={addTodoHandler}
          type="submit"
        >
          Add{" "}
        </button>
      </form> */}
    </div>
  );
};

export default Addtodo;
