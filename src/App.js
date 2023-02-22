import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthComponent from "./components/AuthComponent/AuthComponent.jsx";
import PersonalAccountComponent from "./components/PersonalAccountComponent/PersonalAccountComponent.jsx";
import ResetPasswordComponent from "./components/ResetPasswordComponent/ResetPasswordComponent.jsx";
import SignupComponent from "./components/SignupComponent/SignupComponent.jsx";
import IndexComponent from "./components/IndexComponent/IndexComponent";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<IndexComponent />}></Route>
      <Route path={"/auth"} element={<AuthComponent />}></Route>
      <Route path={"/personal"} element={<PersonalAccountComponent />}></Route>
      <Route path={"/reset"} element={<ResetPasswordComponent />}></Route>
      <Route path={"/signup"} element={<SignupComponent />}></Route>
    </Routes>
  );
}

export default App;
