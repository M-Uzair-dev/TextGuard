import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import CryptoJS from "crypto-js";
import moon from "../images/moon.png";
import sun from "../images/sun.png";
import dots from "../images/dots.png";
import add from "../images/add.png";
import star from "../images/star.png";
import search from "../images/search.png";
import { useSnackbar } from "notistack";
import arrow from "../images/arrow.png";
import { TailSpin } from "react-loader-spinner";

import "./mainpage.css";

const MainPage = React.memo(() => {
  const encryptionKey = "textguard123";
  const decrypt = (encryptedData) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };
  const encrypt = (data) => {
    const encrypted = CryptoJS.AES.encrypt(data, encryptionKey);
    return encrypted.toString();
  };

  const id = localStorage.getItem("ZWltuz3pJK5edXdijsa0moe");
  const encname = localStorage.getItem("$2b$10$10414khcd6b4kxVAP");
  const name = decrypt(encname);
  const encemail = localStorage.getItem("/flu.BtyokRIg8kbXr");
  const email = decrypt(encemail);
  const [showmaindrop, setShowmaindrop] = useState(false);
  const [showfilterdrop, setShowfilterdrop] = useState(false);
  const [shownotedrop, setShowNotedrop] = useState();
  const [filterbasis, setFilterbasis] = useState("All");
  const [showtext, setShowtext] = useState(0);
  const [theme, setTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shownewtab, setShownewtab] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [heading, setHeading] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  const [reloadeffect, setRealoadeffect] = useState(true);
  const [showedittab, setShowedittab] = useState(false);
  const [editingnote, setEditingnote] = useState("");
  const [iseditvalueChecked, setIseditvalueChecked] = useState(false);
  const [redborder, setRedborder] = useState("");
  const [changingname, setChangingname] = useState(name);
  const [shownametab, setShownametab] = useState(false);
  const [changingpass, setChangingpass] = useState("");
  const [showpasstab, setShowpasstab] = useState(false);
  const [mapdata, setMapdata] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [showconfirm, setShowconfirm] = useState(false);
  const [tempid, setTempid] = useState("");
  const [datachanged, setDatachanged] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [spinner, setSpinner] = useState("");
  const [empval, setEmpval] = useState("");
  const [confirmmessage, setConfirmmessage] = useState(
    "Are you sure you want to delete this note ?"
  );
  const glowstyle = {
    boxShadow:
      localStorage.getItem("dark") === "false"
        ? "0 0 20px rgba(107, 11, 131, 0.779)"
        : "0 0 20px rgba(205, 64, 240, 0.419)",
    filter:
      localStorage.getItem("dark") === "false"
        ? "brightness(95%)"
        : "brightness(150%)",
  };
  useEffect(() => {
    const dosmth = () => {
      const storedTheme = localStorage.getItem("dark");

      if (storedTheme === null) {
        setTheme(true);
      } else {
        setTheme(storedTheme === "true");
        document.body.className = storedTheme === "true" ? "dark" : "light";
      }
      if (
        id === undefined ||
        id === null ||
        name === undefined ||
        name === null ||
        email === undefined ||
        email === null
      ) {
        localStorage.clear();
        window.location.reload();
        setIsLoading(false);
      } else {
        setIsLoading(true);

        try {
          fetch(`https://text-guard-api.vercel.app/messages/${id}`)
            .then((response) => response.json())
            .then((datatemp) => {
              setData(datatemp.reverse());
              setMapdata(datatemp.reverse());
              setDatachanged(true);
            });
        } catch (err) {
          console.error(err);
        }
        setIsLoading(false);
      }
    };
    if (reloadeffect) {
      dosmth();
      setRealoadeffect(false);
    }
  }, [reloadeffect]);
  let logout = () => {
    localStorage.removeItem("$10$5HEglOdZhliELg");
    window.location.reload();
  };
  function sendData() {
    if (message === "") {
      setRedborder("message");
      setSpinner("n/a");
    } else if (heading === "") {
      setRedborder("heading");
      setSpinner("n/a");
    } else {
      const data = {
        userId: id,
        heading: heading,
        message: message,
        highlighted: isChecked,
      };
      fetch("https://text-guard-api.vercel.app/messages/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          setRealoadeffect(!reloadeffect);
          setHeading("");
          setMessage("");
          setIsChecked(false);
          setShownewtab(false);
          setRedborder("");
          setSpinner("n/a");
          enqueueSnackbar("Note added Successfully", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("An error occured :-(", { variant: "error" });
          setSpinner("n/a");
        });
    }
  }

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("dark", newTheme ? "true" : "false");

    document.body.className = newTheme ? "dark" : "light";
  };
  let editnote = (id) => {
    setShowedittab(true);
    setEditingnote(`${id}`);
  };
  let editdata = () => {
    if (message === "") {
      setRedborder("message");
      setSpinner("n/a");
    } else if (heading === "") {
      setRedborder("heading");
      setSpinner("n/a");
    } else {
      const data = {
        message: message,
        heading: heading,
        highlighted: iseditvalueChecked,
      };

      fetch(`https://text-guard-api.vercel.app/messages/${editingnote}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error updating the message");
          }
        })
        .then(() => {
          setShowedittab(false);
          setHeading("");
          setMessage("");
          setRedborder("");
          setRealoadeffect(true);
          setSpinner("n/a");
          enqueueSnackbar("Note edited Successfully", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("An error occured :-(", { variant: "error" });
          setSpinner("n/a");
        });
    }
  };
  let editname = () => {
    if (changingname === "") {
      setRedborder("message");
      setSpinner("n/a");
    } else {
      const data = {
        name: changingname,
      };

      fetch(`https://text-guard-api.vercel.app/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error updating the message");
          }
        })
        .then(() => {
          setShownametab(false);
          setRedborder("");
          localStorage.setItem(
            "$2b$10$10414khcd6b4kxVAP",
            encrypt(changingname)
          );
          setRealoadeffect(true);
          setSpinner("n/a");
          enqueueSnackbar("Name edited Successfully", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("An error occured :-(", { variant: "error" });
          setSpinner("n/a");
        });
    }
  };
  let editpassword = () => {
    if (changingpass === "") {
      setRedborder("message");
      setSpinner("n/a");
    } else {
      const data = {
        password: changingpass,
      };

      fetch(`https://text-guard-api.vercel.app/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error updating the message");
          }
        })
        .then(() => {
          setShowpasstab(false);
          setRedborder("");
          setRealoadeffect(true);
          setSpinner("n/a");
          enqueueSnackbar("Password edited Successfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar("An error occured :-(", { variant: "error" });
          setSpinner("n/a");
        });
    }
  };
  async function deleteMessage(id) {
    enqueueSnackbar("deleting...", { variant: "success" });
    const url = `https://text-guard-api.vercel.app/messages/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setRealoadeffect(true);
        enqueueSnackbar("Note deleted Successfully", {
          variant: "success",
        });
      } else if (response.status === 404) {
        enqueueSnackbar("An error occured :-(", { variant: "error" });
      } else {
        enqueueSnackbar("An error occured :-(", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occured :-(", { variant: "error" });
    }
  }
  let searchdata = () => {
    setEmpval("");
    const searchTerm = searchinput.toLowerCase();
    const filteredData = data.filter((item) => {
      const heading = item.heading.toLowerCase();

      return heading.includes(searchTerm);
    });
    if (filteredData.length === 0) {
      setEmpval(searchTerm);
    } else setMapdata(filteredData);
  };
  let filterdata = (b) => {
    if (b === "no") {
      setEmpval("");
      const filteredData = data.filter((item) => !item.highlighted);
      if (filteredData.length === 0) {
        setEmpval("nothighlighted");
      } else {
        setMapdata(filteredData);
      }
    } else if (b === "yes") {
      setEmpval("");
      const filteredData = data.filter((item) => item.highlighted);
      if (filteredData.length === 0) {
        setEmpval("highlighted");
      } else setMapdata(filteredData);
    } else if (b === "all") {
      setEmpval("");
      setMapdata(data);
    }
  };
  let confirm = (x) => {
    if (x === "delete") {
      setShowconfirm(true);
      setConfirmmessage("Are you sure you want to delete this note ?");
    } else if (x === "name") {
      setShowconfirm(true);
      setConfirmmessage(
        `Are you sure you want to change your name to ${changingname} ?`
      );
    } else if (x === "pass") {
      setShowconfirm(true);
      setConfirmmessage(`Are you sure you want to change your password ?`);
    } else if (x === "edit") {
      setShowconfirm(true);
      setConfirmmessage("Are you sure you want to edit this note ?");
    } else if (x === "logout") {
      setShowconfirm(true);
      setConfirmmessage("Are you sure you want to logout ?");
    }
  };
  let validate = (y) => {
    if (y === "no") {
      setShowconfirm(false);
    } else if (y === "yes") {
      if (confirmmessage === "Are you sure you want to delete this note ?") {
        deleteMessage(tempid);
        setShowconfirm(false);
        setShowNotedrop(false);
      } else if (
        confirmmessage ===
        `Are you sure you want to change your name to ${changingname} ?`
      ) {
        setSpinner("name");
        editname();
        setShowconfirm(false);
      } else if (
        confirmmessage === `Are you sure you want to change your password ?`
      ) {
        setSpinner("pass");
        editpassword();
        setShowconfirm(false);
      } else if (
        confirmmessage === "Are you sure you want to edit this note ?"
      ) {
        setSpinner("edit");
        editdata();
        setShowconfirm(false);
        setShowNotedrop(false);
      } else if (confirmmessage === "Are you sure you want to logout ?") {
        logout();
        setShowconfirm(false);
      }
    }
  };
  return (
    <div className="mainpage">
      {showconfirm ? (
        <div
          className="confirm"
          style={{ zIndex: "999999999999999999999999999999999999999999999999" }}
        >
          <h1>{confirmmessage}</h1>
          <div className="buttonsincon">
            <button
              onClick={() => {
                validate("no");
              }}
            >
              No
            </button>
            <button
              onClick={() => {
                validate("yes");
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {shownametab ? (
        <div className="changename">
          <h1>Change Your username</h1>

          <input
            value={changingname}
            onChange={(e) => {
              setChangingname(e.target.value);
            }}
            style={redborder === "message" ? { border: "2px solid red" } : {}}
          />
          {spinner === "name" ? (
            <button>
              <TailSpin
                height="25"
                width="25"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                if (changingname.length === 0) {
                  setRedborder("message");
                  enqueueSnackbar("Please enter a name.", {
                    variant: "error",
                  });
                } else if (changingname.length < 5) {
                  setRedborder("message");
                  enqueueSnackbar("Name must be longer than 5 characters", {
                    variant: "error",
                  });
                } else {
                  confirm("name");
                }
              }}
            >
              Change
            </button>
          )}

          <img
            alt="add logo"
            src={add}
            style={{ transform: "rotate(45deg)" }}
            onClick={() => {
              setShownametab(false);
              setRedborder("");
            }}
          />
        </div>
      ) : (
        <></>
      )}

      {showpasstab ? (
        <div className="changename">
          <h1>Enter new password</h1>

          <input
            value={changingpass}
            type="password"
            onChange={(e) => {
              setChangingpass(e.target.value);
            }}
            style={redborder === "message" ? { border: "2px solid red" } : {}}
          />
          {spinner === "pass" ? (
            <button>
              <TailSpin
                height="25"
                width="25"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                if (changingpass.length < 5) {
                  setRedborder("message");
                  enqueueSnackbar("Password cannot be empty.", {
                    variant: "error",
                  });
                } else {
                  confirm("pass");
                }
              }}
            >
              Change
            </button>
          )}
          <img
            alt="add logo"
            src={add}
            style={{ transform: "rotate(45deg)" }}
            onClick={() => {
              setShowpasstab(false);
              setRedborder("");
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div
        style={shownewtab ? { display: "flex" } : { display: "none" }}
        className="newtab"
      >
        {" "}
        <h1>Add new Note</h1>
        <label htmlFor="heading">Heading:</label>
        <input
          id="heading"
          placeholder="Enter the Heading"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
          style={redborder === "heading" ? { border: "2px solid red" } : {}}
        />
        <label htmlFor="note">Note :</label>
        <textarea
          id="note"
          rows={10}
          placeholder="Enter your note"
          style={redborder === "message" ? { border: "2px solid red" } : {}}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <label htmlFor="sethighlighted">Highlighted :</label>
        <div className="checkbox-wrapper">
          <input
            id="_checkbox-26"
            type="checkbox"
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
            checked={isChecked}
          />
          <label htmlFor="_checkbox-26">
            <div className="tick_mark"></div>
          </label>
        </div>
        {spinner === "add" ? (
          <button className="addbuttonindrop">
            <TailSpin
              height="25"
              width="25"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button>
        ) : (
          <button
            className="addbuttonindrop"
            onClick={() => {
              setSpinner("add");
              sendData();
            }}
          >
            Add
          </button>
        )}
        <img
          alt="add logo"
          src={add}
          style={{ transform: "rotate(45deg)" }}
          onClick={() => {
            setShownewtab(false);
            setRedborder("");
          }}
        />
      </div>
      <div
        style={showedittab ? { display: "flex" } : { display: "none" }}
        className="newtab"
      >
        {" "}
        <h1>Edit Note</h1>
        <label htmlFor="heading">Heading:</label>
        <input
          id="heading"
          placeholder="Enter the Heading"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
          style={redborder === "heading" ? { border: "2px solid red" } : {}}
        />
        <label htmlFor="note">Note :</label>
        <textarea
          id="note"
          rows={10}
          placeholder="Enter your note"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          style={redborder === "message" ? { border: "2px solid red" } : {}}
        />
        <label htmlFor="sethighlighted">Highlighted :</label>
        <div className="checkbox-wrapper">
          <input
            id="_checkbox-27"
            type="checkbox"
            onChange={(e) => {
              setIseditvalueChecked(e.target.checked);
            }}
            checked={iseditvalueChecked}
          />
          <label htmlFor="_checkbox-27">
            <div className="tick_mark"></div>
          </label>
        </div>
        {spinner === "edit" ? (
          <button className="addbuttonindrop">
            <TailSpin
              height="25"
              width="25"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button>
        ) : (
          <button
            className="addbuttonindrop"
            onClick={() => {
              confirm("edit");
            }}
          >
            Confirm
          </button>
        )}
        <img
          alt="add logo"
          src={add}
          style={{ transform: "rotate(45deg)" }}
          onClick={() => {
            setShowedittab(false);
            setRedborder("");
            setMessage("");
            setHeading("");
            setIsChecked("");
          }}
        />
      </div>
      <nav className="navbar">
        <img className="mainlogo" src={logo} alt="logo" />
        <div className="rightside">
          <div
            onClick={() => {
              toggleTheme();
            }}
          >
            {theme ? (
              <img src={moon} alt="theme logo" className="themebutton" />
            ) : (
              <img
                src={sun}
                className="themebutton"
                alt="theme logo"
                style={{ filter: "brightness(0%)" }}
              />
            )}
          </div>
          <img
            alt="icon"
            src={add}
            className="addbutton"
            style={
              theme
                ? { filter: "brightness(1000%)" }
                : { filter: "brightness(0%)" }
            }
            onClick={() => {
              setShownewtab(true);
            }}
          />
          {showmaindrop ? (
            <img
              alt="icon"
              className="dots"
              src={add}
              onClick={() => {
                setShowmaindrop(!showmaindrop);
              }}
              style={
                theme
                  ? { filter: "brightness(1000%)", transform: "rotate(45deg)" }
                  : { filter: "brightness(0%)", transform: "rotate(45deg)" }
              }
            />
          ) : (
            <img
              alt="icon"
              src={dots}
              className="dots"
              onClick={() => {
                setShowmaindrop(!showmaindrop);
              }}
              style={
                theme
                  ? { filter: "brightness(1000%)" }
                  : { filter: "brightness(0%)" }
              }
            />
          )}
        </div>
        <div
          className="dropdown"
          style={showmaindrop ? { display: "block" } : { display: "none" }}
        >
          <p
            onClick={() => {
              setChangingname(name);
              setShownametab(true);
              setShowmaindrop(false);
            }}
          >
            Change Name
          </p>
          <p
            onClick={() => {
              setShowpasstab(true);
              setShowmaindrop(false);
            }}
          >
            Change Password
          </p>
          <p
            onClick={() => {
              confirm("logout");
            }}
          >
            Logout
          </p>
          <p
            className="temp"
            onClick={() => {
              toggleTheme();
            }}
          >
            Theme
          </p>
          <p
            className="temp"
            onClick={() => {
              setShownewtab(true);
              setShowmaindrop(false);
            }}
          >
            Add Note
          </p>
        </div>
      </nav>
      <div className="greet">
        <p className="welcome">Welcome</p>
        <div className="namediv">
          <div className="star1">
            <img src={star} alt="star" className="star1in" />
          </div>
          <div className="star2">
            <img src={star} alt="star" className="star2in" />
          </div>
          <div className="star3">
            <img src={star} alt="star" className="star3in" />
          </div>
          <div className="star4">
            <img src={star} alt="star" className="star4in" />
          </div>
          <h1 className="name">{name}</h1>
        </div>
        <h2>Your Notes : </h2>
      </div>
      <div className="filter">
        <div className="filterresults">
          <p>{filterbasis}</p>
          <div
            style={
              theme
                ? { filter: "brightness(1000%)" }
                : { filter: "brightness(0%)" }
            }
          >
            <img
              src={arrow}
              alt="arrow"
              style={
                showfilterdrop
                  ? { transform: "rotate(180deg)" }
                  : { transform: "rotate(0deg)" }
              }
              onClick={() => {
                setShowfilterdrop(!showfilterdrop);
              }}
            />
          </div>
          <div
            className="filterDropdown"
            style={showfilterdrop ? { display: "block" } : { display: "none" }}
          >
            <p
              onClick={() => {
                setFilterbasis("Highlighted");
                setShowfilterdrop(false);
                filterdata("yes");
              }}
            >
              Highlighted
            </p>
            <p
              onClick={() => {
                setFilterbasis("Not-Highlighted");
                setShowfilterdrop(false);
                filterdata("no");
              }}
            >
              Not-Highlighted
            </p>
            <p
              onClick={() => {
                setFilterbasis("All");
                setShowfilterdrop(false);
                filterdata("all");
              }}
            >
              All
            </p>
          </div>
        </div>
        <div className="search">
          <img
            src={search}
            alt="Search icon"
            style={
              theme
                ? { filter: "brightness(1000%)" }
                : { filter: "brightness(0%)" }
            }
            onClick={() => {
              searchdata();
            }}
          />
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchdata();
              }
            }}
            placeholder="Search"
            value={searchinput}
            onChange={(e) => {
              setSearchinput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="notes">
        {empval === "nothighlighted" ? (
          <h1 className="nonotestext">
            You don't have any non-highlighted notes.{" "}
          </h1>
        ) : empval === "highlighted" ? (
          <h1 className="nonotestext">
            You don't have any highlighted notes.{" "}
          </h1>
        ) : empval !== "" ? (
          <h1 className="nonotestext">
            No notes found for search "{empval}".{" "}
          </h1>
        ) : mapdata.length === 0 && datachanged == true ? (
          <h1 className="nonotestext">
            You don't have any notes, Please{" "}
            <span
              className="link"
              onClick={() => {
                setShownewtab(true);
              }}
            >
              Add a note
            </span>
          </h1>
        ) : isLoading ? (
          <h1>Loading...</h1>
        ) : (
          mapdata.map((element, index) => (
            <div key={index}>
              <div
                className="note"
                style={element.highlighted ? glowstyle : {}}
              >
                <div className="text">
                  <p className="date">
                    {element.date.substring(8, 10)}{" "}
                    {element.date.substring(5, 7) === "1"
                      ? "January"
                      : element.date.substring(5, 7) === "2"
                      ? "February"
                      : element.date.substring(5, 7) === "3"
                      ? "March"
                      : element.date.substring(5, 7) === "4"
                      ? "April"
                      : element.date.substring(5, 7) === "5"
                      ? "May"
                      : element.date.substring(5, 7) === "6"
                      ? "June"
                      : element.date.substring(5, 7) === "7"
                      ? "July"
                      : element.date.substring(5, 7) === "8"
                      ? "August"
                      : element.date.substring(5, 7) === "9"
                      ? "September"
                      : element.date.substring(5, 7) === "10"
                      ? "October"
                      : element.date.substring(5, 7) === "11"
                      ? "November"
                      : "December"}{" "}
                    {element.date.substring(0, 4)}
                  </p>
                  <p className="heading">{element.heading}</p>
                </div>

                <div
                  className="actionbuttons"
                  style={
                    theme
                      ? { filter: "brightness(1000%)" }
                      : { filter: "brightness(0%)" }
                  }
                >
                  {shownotedrop === element._id ? (
                    <img
                      alt="notedotsicon"
                      src={add}
                      style={{ transform: "rotate(45deg)" }}
                      onClick={() => {
                        setShowNotedrop(0);
                      }}
                    />
                  ) : (
                    <img
                      alt="icon"
                      src={dots}
                      className="notedotsicon"
                      onClick={() => {
                        setShowNotedrop(element._id);
                      }}
                    />
                  )}
                  <img
                    src={arrow}
                    alt="arrow"
                    style={
                      showtext === element._id
                        ? { transform: "rotate(180deg)" }
                        : { transform: "rotate(0deg)" }
                    }
                    onClick={() => {
                      showtext === element._id
                        ? setShowtext(0)
                        : setShowtext(element._id);
                    }}
                    className="notearrow"
                  />
                </div>
                <div
                  className="notedropdown"
                  style={
                    shownotedrop === element._id
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <p
                    onClick={() => {
                      editnote(element._id);
                      setMessage(element.message);
                      setHeading(element.heading);
                      setIseditvalueChecked(element.highlighted);
                    }}
                  >
                    Edit
                  </p>
                  <p
                    onClick={() => {
                      setTempid(element._id);
                      confirm("delete");
                    }}
                  >
                    Delete
                  </p>
                </div>
              </div>
              {showtext === element._id ? (
                <div>
                  <p className="bgtext">{element.message}</p>
                </div>
              ) : (
                <div style={{ margin: "0", padding: "0" }}></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default MainPage;
