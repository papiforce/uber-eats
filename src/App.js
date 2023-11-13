import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import ListProduct from "./screens/ListProduct";
import RegistrationForm from "./screens/RegistrationForm";


function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<ListProduct />}></Route>
        <Route path="/Registration" element={<RegistrationForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
