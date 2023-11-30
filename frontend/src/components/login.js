import React, { useState } from "react";
import "./login.css";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import moon from "../images/moon.png";
import sun from "../images/sun.png";
import logo from "../images/logo.png";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [theme, setTheme] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("");
  const [redname, setRedname] = useState(false);
  const [redemail, setRedemail] = useState(false);
  const [redpass, setRedpass] = useState(false);

  const encryptionKey = "textguard123";

  const encrypt = (data) => {
    const encrypted = CryptoJS.AES.encrypt(data, encryptionKey);
    return encrypted.toString();
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("dark");
    if (storedTheme === null) {
      setTheme(true);
    } else {
      setTheme(storedTheme === "true");
      document.body.className = storedTheme === "true" ? "dark" : "light";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("dark", newTheme);

    document.body.className = newTheme ? "dark" : "light";
  };
  function hasEmail(text) {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    return emailPattern.test(text);
  }
  const Signup = () => {
    if (name === "") {
      setMessage("Please enter your name");
      setRedname(true);
      setErr(true);
    } else if (name.length < 5) {
      setMessage("Name must be longer than 5 characters");
      setRedname(true);
      setErr(true);
    } else if (email === "") {
      setMessage("Please enter your email");
      setRedemail(true);
      setErr(true);
    } else if (password === "") {
      setMessage("Please enter your password");
      setRedpass(true);
      setErr(true);
    } else if (!hasEmail(email)) {
      setMessage("Please enter a validemail");
      setRedemail(true);
      setErr(true);
    } else {
      (async () => {
        try {
          const temppostedUser = await fetch(
            "http://localhost:5000/users/new",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
              }),
            }
          );
          const postedUser = await temppostedUser.json();

          if (postedUser.message === "Email already in use") {
            setMessage("Email already registered");
            setRedemail(true);
            setErr(true);
          } else {
            localStorage.setItem("$10$5HEglOdZhliELg", true);
            let encname = encrypt(postedUser.name);
            let encemail = encrypt(postedUser.email);
            localStorage.setItem("$2b$10$10414khcd6b4kxVAP", encname);
            localStorage.setItem("/flu.BtyokRIg8kbXr", encemail);
            localStorage.setItem("ZWltuz3pJK5edXdijsa0moe", postedUser._id);
            window.location.reload();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }
  };
  const userlogin = () => {
    if (email === "") {
      setMessage("Please enter your email");
      setRedemail(true);
      setErr(true);
    } else if (password === "") {
      setMessage("Please enter your password");
      setRedpass(true);
      setErr(true);
    } else if (!hasEmail(email)) {
      setMessage("Please enter a validemail");
      setRedemail(true);
      setErr(true);
    } else {
      (async () => {
        try {
          let response = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          let data = await response.json();
          if (data.message === "No user with email") {
            setMessage("Email not found.");
            setRedemail(true);
            setErr(true);
          } else if (data.message === "Wrong Password") {
            setMessage("Wrong Password");
            setRedpass(true);
            setErr(true);
          } else {
            localStorage.setItem("$10$5HEglOdZhliELg", true);
            let encname = encrypt(data.user.name);
            let encemail = encrypt(data.user.email);
            localStorage.setItem("$2b$10$10414khcd6b4kxVAP", encname);
            localStorage.setItem("/flu.BtyokRIg8kbXr", encemail);
            localStorage.setItem("ZWltuz3pJK5edXdijsa0moe", data.user._id);
            localStorage.setItem(
              "7d49304ad154fliELghtkJSpg.uFBHTbig60mHKnLDVOt/zn",
              data.user.password
            );
            window.location.reload();
          }
        } catch (err) {
          console.error("Error", err);
        }
      })();
    }
  };

  return (
    <div className="maindiv">
      <img className="logo" src={logo} alt="logo" />
      {!signup ? (
        <div className="card">
          <h1 className="heading">Login</h1>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            style={redemail ? { borderBottom: "2px solid rgb(255, 0, 0)" } : {}}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (redemail) {
                setRedemail(false);
                setErr(false);
              }
            }}
          />
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            style={redpass ? { borderBottom: "2px solid rgb(255, 0, 0)" } : {}}
            onChange={(e) => {
              setPassword(e.target.value);
              if (redpass) {
                setRedpass(false);
                setErr(false);
              }
            }}
          />
          {err ? <p className="err">{message}</p> : <></>}
          <button className="button" onClick={userlogin}>
            Login
          </button>
          <p className="text">
            Don't have an account ?{" "}
            <span
              onClick={() => {
                setSignup(true);
                setErr(false);
                setRedemail(false);
                setRedname(false);
                setRedpass(false);
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      ) : (
        <div className="card">
          <h1 className="heading">Signup</h1>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            style={redname ? { borderBottom: "2px solid rgb(255, 0, 0)" } : {}}
            placeholder="Enter your name"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (redname) {
                setRedname(false);
                setErr(false);
              }
            }}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            value={email}
            style={redemail ? { borderBottom: "2px solid rgb(255, 0, 0)" } : {}}
            onChange={(e) => {
              setEmail(e.target.value);
              if (redemail) {
                setRedemail(false);
                setErr(false);
              }
            }}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            style={redpass ? { borderBottom: "2px solid rgb(255, 0, 0)" } : {}}
            onChange={(e) => {
              setPassword(e.target.value);
              if (redpass) {
                setRedpass(false);
                setErr(false);
              }
            }}
          />
          {err ? <p className="err">{message}</p> : <></>}

          <button className="button" onClick={Signup}>
            Signup
          </button>
          <p className="text">
            Already have an account ?{" "}
            <span
              onClick={() => {
                setSignup(false);
                setErr(false);
                setRedemail(false);
                setRedname(false);
                setRedpass(false);
              }}
            >
              Log in
            </span>
          </p>
        </div>
      )}
      <div className="themetoggle" onClick={toggleTheme}>
        {theme ? (
          <img src={moon} alt="theme logo" />
        ) : (
          <img src={sun} alt="theme logo" />
        )}
      </div>
    </div>
  );
};

export default Login;
