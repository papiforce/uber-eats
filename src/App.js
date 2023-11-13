import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Nav from "./components/Nav";
import SearchFood from "./components/SearchFood";
import Connection from "./pages/Connection"


function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<SearchFood />}
          />
          <Route
          path='/login'
          element={<Connection />}
          />
      </Routes>
    </div>
  );
}

export default App;
