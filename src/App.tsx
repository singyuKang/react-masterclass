import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
import Login from "./Routes/Login";
import SignUp from "./Routes/Signup";
import MovieDetail from "./Routes/MovieDetail";
import RequireAuth from "./Routes/RequireAuth";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/tv"
          element={
            <AuthProvider>
              <Tv />
            </AuthProvider>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <AuthProvider>
              <Search />
            </AuthProvider>
          }
        ></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/movie/:id"
          element={
            <AuthProvider>
              <MovieDetail />
            </AuthProvider>
          }
        />
        <Route
          path="/home"
          element={
            <AuthProvider>
              <Home />
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
