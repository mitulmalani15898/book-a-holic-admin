import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/books/add" element={<AddBook />}></Route>
          <Route path="/books/edit" element={<AddBook />}></Route>
          {/* <Route exact path="/all" element={<AllUsers />} /> */}
          <Route exact path="/users" element={<AllUsers />}></Route>
          <Route exact path="/users/edit/:id" element={<EditUser />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
