import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "./features/Users";
import Swal from "sweetalert2";
import Model from "./components/Model";

function App() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users.value);

  const [addModel, setModel] = useState(false);
  const [user, setUser] = useState();

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${user.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "User has been added!.", "success");
        dispatch(deleteUser({ id: user.id }));
      }
    });
  };

  return (
    <div className="container pt-5 text-center">
      <Model
        isActive={addModel}
        setActive={setModel}
        user={user}
        setUser={setUser}
      />
      <header className="mb-4">
        <h1>React CRUD app.</h1>
        <button
          className="btn btn-primary btn-lg shadow-sm"
          onClick={() => setModel(true)}
        >
          Add user
        </button>
      </header>
      <table className="table table-striped mb-0 shadow-sm rounded-3 overflow-hidden">
        <thead>
          <tr className="text-white bg-dark">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length !== 0 &&
            usersList.slice(0).reverse().map((user, index) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm m-1 shadow-sm"
                      onClick={() => {
                        setUser(user);
                        setModel(true);
                      }}
                    >
                      Edit <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm m-1 shadow-sm"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {usersList.length === 0 && (
        <div className="text-center bg-light py-3 shadow-sm rounded">
          <p>There is no users yet.</p>
          <button className="btn btn-primary" onClick={() => setModel(true)}>
            Add new user
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
