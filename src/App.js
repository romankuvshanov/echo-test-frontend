import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthComponent from "./components/AuthComponent/AuthComponent.jsx";
import PersonalAccountComponent from "./components/PersonalAccountComponent/PersonalAccountComponent.jsx";
import ResetPasswordComponent from "./components/ResetPasswordComponent/ResetPasswordComponent.jsx";
import SignupComponent from "./components/SignupComponent/SignupComponent.jsx";
import TokenComponent from "./components/TokenComponent/TokenComponent";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<AuthComponent />}></Route>
      <Route path={"/personal"} element={<PersonalAccountComponent />}></Route>
      <Route path={"/reset"} element={<ResetPasswordComponent />}></Route>
      <Route path={"/signup"} element={<SignupComponent />}></Route>
      <Route path={"/token"} element={<TokenComponent />}></Route>
      <Route path={"/tokenCounter"} element={<Counter />}></Route>
    </Routes>
  );
}

export default App;
