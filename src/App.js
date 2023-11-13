import "./App.css";
import Nav from "./components/Nav";
import SearchFood from "./components/SearchFood";
import ListProduct from "./screens/ListProduct";

function App() {
  return (
    <div>
      <Nav />
      <SearchFood />
      <ListProduct />
    </div>
  );
}

export default App;
