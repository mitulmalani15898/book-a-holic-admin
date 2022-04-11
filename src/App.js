import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import AllUsers from "./components/AllUsers";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import { isLoggedIn } from "./utils/common";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace={true} /> : children;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/books/add"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/books/edit"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/users"
            element={
              <PrivateRoute>
                <AllUsers />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/users/edit/:id"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
