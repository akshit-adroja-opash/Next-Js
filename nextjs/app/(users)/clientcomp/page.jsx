"use client";

import { useEffect, useState } from "react";
import { Counter } from "./counter.jsx";



const URL = "https://jsonplaceholder.typicode.com/users";

const ClientComp = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-roboto text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
        Users List (Client Component)
      </h1>
      
      <button 
        className="bg-amber-300 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-12 mx-auto block"
        onClick={() => alert("Hello from Client Component!")}
      >
        Interactive Button
      </button>
      <Counter />



      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading users...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div 
              key={user.id}
              className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 hover:border-white/30"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">{user.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-blue-400 transition-colors">
                {user.name}
              </h3>
              <div className="space-y-3 mt-4">

                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">Email:</span>
                  <br />
                  <a href={`mailto:${user.email}`} className="hover:text-blue-400 transition-colors text-gray-200">
                    {user.email}
                  </a>
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">Phone:</span>
                  <br />
                  <span>{user.phone}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-white">Company:</span>
                  <br />
                  <span className="font-medium">{user.company?.name || 'N/A'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default ClientComp;
