import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path ="/books" element = {<Books/>}></Route>
          <Route path ="/books/add" element = {<AddBook/>}></Route>
          <Route path ="/books/edit" element = {<AddBook/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
