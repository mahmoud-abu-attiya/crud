import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUsername } from "../features/Users";

const Model = (props) => {
  const usersList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");

  const handleAddUser = () => {
    if (username === "") {
      document.getElementById("name").classList.add("is-invalid");
    } else if (useremail === "") {
      document.getElementById("email").classList.add("is-invalid");
    } else {
      dispatch(
        addUser({
          id:
            usersList.length === 0 ? 0 : usersList[usersList.length - 1].id + 1,
          name: username,
          email: useremail,
        })
      );
      props.setActive(false);
      setUseremail("");
      setUsername("");
      Swal.fire("Added!", "User has been Added.", "success");
    }
  };

  // For disable edit btn
  const inputsChange = () => {
    let newEmail = document.getElementById("email").value;
    let newName = document.getElementById("name").value;
    
    if (props.user) {
      if (props.user.name !== newName || props.user.email !== newEmail) {
        setEdit(true);
      }
    }
  };

  const handleEdit = () => {
    let newEmail = document.getElementById("email").value;
    let newName = document.getElementById("name").value;

    Swal.fire("Edited!", "User has been edited.", "success");
    dispatch(
      updateUsername({ id: props.user.id, name: newName, email: newEmail })
    );
    props.setUser();
    props.setActive(false);
  };

  return (
    props.isActive && (
      <>
        <div
          className="overlay vw-100 vh-100 bg-dark opacity-50 position-fixed top-0 start-0"
          style={{ zIndex: 9 }}
        ></div>
        <div
          className="model w-90 bg-light position-fixed top-50 start-50 p-3 pt-2 translate-middle shadow-lg rounded-3"
          style={{ zIndex: 10 }}
        >
          <div className="cansel text-end">
            <button
              className="border-0 bg-transparent"
              onClick={() => {
                props.setActive(false);
                props.user ? props.setUser() : props.setActive(false);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={props.user ? props.user.name : ""}
              placeholder="name"
              onChange={(e) => {
                setUsername(e.target.value);
                inputsChange();
              }}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              defaultValue={props.user ? props.user.email : ""}
              placeholder="name@example.com"
              onChange={(e) => {
                setUseremail(e.target.value);
                inputsChange();
              }}
            />
            <label htmlFor="email">Email address</label>
          </div>
          {props.user ? (
            <button
              className="btn btn-warning w-100 shadow-sm"
              onClick={() => handleEdit()}
              disabled={edit ? null : "disabled"}
            >
              edit <i className="fas fa-edit"></i>
            </button>
          ) : (
            <button
              className="btn btn-primary w-100 shadow-sm"
              onClick={() => handleAddUser()}
            >
              Add <i className="fas fa-plus"></i>
            </button>
          )}
        </div>
      </>
    )
  );
};

export default Model;
