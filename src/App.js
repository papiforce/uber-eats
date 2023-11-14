import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ListProduct from "./screens/ListProduct";
import RegistrationForm from "./screens/RegistrationForm";
import Connection from "./screens/Connection"
import ListUsers from "./screens/ListUsers";


function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<ListProduct />}></Route>
        <Route path="/Registration" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Connection />}></Route>
        <Route path="/listUsers" element={<ListUsers />}></Route>
      </Routes>
    </div>
  );
}

export default App;