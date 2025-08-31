export default function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <h1 style={{ color: 'darkblue' }}>🚀 Travel Planner is Working!</h1>
      <p>If you can see this, React is running properly.</p>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Plan your perfect trip with ease</h1>
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full border rounded-lg p-2 mb-4"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full hover:bg-teal-600">
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
}
