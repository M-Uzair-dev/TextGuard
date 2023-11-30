import React from "react";
import Login from "./components/login";
import MainPage from "./components/mainpage";

function App() {
  localStorage.setItem("$abc$xyz123", "U2FsdGVkX19abcxyz123");
  localStorage.setItem(
    "GVkX183CDEfgHIJK",
    "$2b$10$abcxyz123abcxyz123abcxyz123abcxyz123abcxyz123abcxyz123"
  );
  localStorage.setItem("$3$CDEfg", "U2FsdGVkX183CDEfgHIJKLMNO");
  localStorage.setItem(
    "8b86936036224db30",
    "$2b$10$123abcxyzabcxyzabcxyzabcxyzabcxyzabcxyzabcxyzabcxyz"
  );
  localStorage.setItem("$2b$10$abcxyz", "655f28b86936036224db3032");
  const loggedIn = localStorage.getItem("$10$5HEglOdZhliELg");

  return <div className="App">{loggedIn ? <MainPage /> : <Login />}</div>;
}

export default App;
