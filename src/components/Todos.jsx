import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";


const Todos = () => {
  const todos = useSelector((state) => state.todos);
const dispatch = useDispatch();
console.log(todos);

  return (
    <>  
    
      {/* <ul>
            
        {todos.map((siva) => {
          return (
            <div key={siva.id}>
            
              <p className="text-xl text-black">{siva.text} </p>
              <button onClick={()=>dispatch(removeTodo(siva.id))}>delete</button>
              
            </div>
               
          );
        })}  
      </ul> */}


    </>
  );
};

export default Todos;
