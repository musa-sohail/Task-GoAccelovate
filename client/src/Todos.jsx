import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/get-todo"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/create-todo",
        {
          title,
          description,
        }
      );
      if (response.data) {
        setTodos((prevTodos) => [...prevTodos, response.data]);
        // Reset the form fields after adding the todo
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/delete-todo/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addTodo} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter description"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Add Todo
          </button>
        </div>
      </form>

      <h1 className="text-center text-2xl font-semibold text-black">Todos</h1>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-300"
          >
            <h2 className="text-xl font-semibold text-black">{todo.title}</h2>
            <p className="text-black">{todo.description}</p>
            <div className="mt-4 flex space-x-4">
              <Link
                to={`/edit/${todo._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-black">Loading todos...</p>
      )}
    </div>
  );
};

export default Todos;
