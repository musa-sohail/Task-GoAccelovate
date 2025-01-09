import React from "react";
import Todos from "./Todos";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <div className="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-semibold mb-6">Add a Todo</h1>
        {/* Calling Todos component that handles the add functionality */}
        <Todos />
      </div>
    </div>
  );
};

export default Home;
