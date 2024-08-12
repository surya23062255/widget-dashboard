import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-400 text-white font-bold p-4 text-center text-2xl">
        Widget Dashboard
      </header>
      <main className="p-4">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
