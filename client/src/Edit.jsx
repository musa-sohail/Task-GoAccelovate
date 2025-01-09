import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/get-todo/${id}`
        );
        setTitle(response.data.todo.title);
        setDescription(response.data.todo.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, [id]);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/update-todo/${id}`,
        {
          title,
          description,
        }
      );
      if (response) {
        alert("Updated");
        setTitle("");
        setDescription("");
        navigate("/"); // Navigate back to the homepage after successful edit
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-semibold mb-6">Edit Todo</h1>

        <form onSubmit={updateTodo} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
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
              className="block text-sm font-medium text-gray-600"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
