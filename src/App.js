import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ListProduct from "./screens/ListProduct";
import RegistrationForm from "./screens/RegistrationForm";
import Connection from "./screens/Connection"
import AddMenu from "./screens/AddMenu"
import AdminInterface from "./screens/AdminInterface"
import Menu from "./screens/ListProduct"
import ListUsers from "./screens/ListUsers"





function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<ListProduct />}></Route>
        <Route path="/Registration" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Connection />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/admin" element={<AdminInterface />}></Route>
        <Route path="/admin/addMenu" element={<AddMenu />}></Route>
        <Route path="/admin/users" element={<ListUsers />}></Route>
      </Routes>
    </div>
  );
}

export default App;