import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, addTodo, updateTodo } from "../features/todo/todoSlice";  // Ensure updateTodo action exists

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");  // Track the selected group
  const [editingTask, setEditingTask] = useState(null);  // Track task being edited
  const todos = useSelector((state) => state.todos); // Redux state for todos
  const dispatch = useDispatch();

  // Filter tasks based on the search term
  const filteredTodos = todos.filter((todo) =>
    typeof todo.text === "string" && todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tasks by selected group (if a group is selected)
  const filteredByGroup = selectedGroup
    ? filteredTodos.filter((todo) => todo.category === selectedGroup)  // Filter tasks by category
    : filteredTodos;

  // Handle task addition
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask, category: selectedGroup || "General" };
      dispatch(addTodo(task));  // Dispatch to Redux
      setNewTask("");
      setIsModalOpen(false);
    }
  };

  // Handle task update
  const handleUpdateTask = () => {
    if (editingTask && newTask.trim()) {
      dispatch(updateTodo({
        id: editingTask.id,
        text: newTask,
        category: editingTask.category
      }));
      setEditingTask(null);
      setNewTask("");
      setIsModalOpen(false);
    }
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    dispatch(removeTodo(taskId));
  };

  // Set selected group for new task
  const addTodoHandler = (groupName) => {
    setSelectedGroup(groupName);
    setIsModalOpen(true);  // Open the task modal
    setEditingTask(null);   // Ensure it's not in edit mode
  };

  // Start editing task
  const startEditingTask = (task) => {
    setEditingTask(task);
    setNewTask(task.text);
    setIsModalOpen(true);  // Open the modal for editing
  };

  // Handle adding new group
  const handleAddGroup = () => {
    if (newGroup.trim() && !groups.includes(newGroup)) {
      setGroups([...groups, newGroup]);
      setNewGroup("");
      setIsGroupModalOpen(false);
    }
  };

  // Handle deleting the entire group
  const handleDeleteGroup = (groupName) => {
    // Remove all tasks that belong to this group
    const tasksInGroup = todos.filter(todo => todo.category === groupName);
    tasksInGroup.forEach(todo => {
      dispatch(removeTodo(todo.id));  // Dispatch the remove action for each task
    });
    
    // Remove the group from the groups list
    setGroups(groups.filter(group => group !== groupName));
    // Clear the selected group if it matches the deleted group
    if (selectedGroup === groupName) {
      setSelectedGroup("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white text-black px-4 pt-2 hidden sm:block ">
        <h2 className="text-lg font-bold">Task Groups</h2>
        <button
          className="mt-12 bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
          onClick={() => setIsGroupModalOpen(true)}
        >
          Add Group
        </button>
       
      
  {groups.map((group, index) => (
    <div key={index} className="flex justify-between items-center mb-2 ">
      <button
        className="group-button flex items-center justify-between  w-full bg-blue-500 text-white px-4 py-2 rounded-l-lg  hover:bg-blue-400 transition-all duration-300"
        onClick={() => addTodoHandler(group)}
      >
        {group}

       
      </button>
      <button
        className="delete-button bg-red-500 text-white text-md px-4 py-2  rounded-r-lg hover:bg-red-400 transition-all duration-300"
        onClick={() => handleDeleteGroup(group)}
      >
        Delete
      </button>
    </div>
  ))}
 </div>

      {/* Main Header Section */}
      <div className="w-3/4 bg-blue-600 px-4 h-12 flex justify-between items-center sticky top-0 sm:gap-4">
        <div className="flex items-center justify-center gap-4 sm:gap-2">
          <p className="text-white font-bold text-xl">ToDo</p>
        </div>
        <input
          className="outline-none p-1 text-gray-700 w-[600px] rounded-md"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className="absolute top-20 right-0 bg-white shadow-md w-3/4 max-h-screen overflow-auto rounded-md p-4">
        {selectedGroup && (
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
            Tasks in "{selectedGroup}" Group
          </h3>
        )}
        <ul>
          {filteredByGroup.length > 0 ? (
            filteredByGroup.map((todo) => (
              <li key={todo.id} className="p-2 border-b flex justify-between items-start">
                <p className="text-black">{todo.text}</p>
                <div className="flex space-x-2  ">
                  <button
                    onClick={() => startEditingTask(todo)}
                    className="bg-yellow-500 text-white px-2 py-1   rounded-md"
                  >
                    update
                  </button>
                  <button
                    onClick={() => handleDeleteTask(todo.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-red-500 text-center">No Tasks found</li>
          )}
        </ul>
      </div>

      {/* Task Modal */}
     
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-md w-96">
      <h2 className="text-lg font-bold mb-2">{editingTask ? "Edit Task" : "Add New Task"}</h2>
      <textarea
        className="w-full p-2 border rounded-md resize-none focus:outline-none text-gray-700"
        placeholder="Enter task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        rows={3}  // Default height of the textarea
      />
      <div className="flex justify-end gap-2 mt-4">
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={editingTask ? handleUpdateTask : handleAddTask}
        >
          {editingTask ? "Update" : "Add"}
        </button>
      </div>
    </div>
  </div>
)}


      {/* Group Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <h2 className="text-lg font-bold mb-2">Add New Group</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter group name..."
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsGroupModalOpen(false)}>Cancel</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddGroup}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
