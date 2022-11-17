import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
import Login from "./Routes/Login";
import SignUp from "./Routes/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}>
          <Route path="movies/:id" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
