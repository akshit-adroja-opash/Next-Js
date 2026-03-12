async function ServerComp() {
  const URL = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(URL);
  const users = await response.json();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
        Server Component Users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {users.map((user) => (
          <div key={user.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-emerald-400">
            <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p className="text-gray-400"><span className="font-semibold">Company:</span> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServerComp;


