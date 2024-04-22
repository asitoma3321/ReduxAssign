// userTable.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, userRemoved, userSelected } from "./userSlice";
import "./userTable.css"; // Import CSS file

export function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.entities);
  const loading = useSelector((state) => state.users.loading);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchUsers());
    }
  }, [loading, dispatch]);

  const handleSelect = (event) => {
    dispatch(userSelected(Number(event.target.value)));
  };

  const handleRemove = (userId) => {
    console.log("Removing user:", userId); // Log user ID to check
    dispatch(userRemoved(userId));
  };

  return (
    <div className="user-table-container">
      {
        <div className="loading-message" style={{ paddingBottom: 15 }}>
          {" "}
          REDUX ASSIGNMENT BY - Anirban Sarkar
        </div>
      }
      {loading === "loading" && <div>Loading...</div>}
      <select onChange={handleSelect} className="user-dropdown">
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id} - {user.username}
          </option>
        ))}
      </select>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.id === selectedUser)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleRemove(user.id)} className="remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
