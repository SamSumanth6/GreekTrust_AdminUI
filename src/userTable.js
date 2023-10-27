    import React from "react";
    import editIcon from "./edit.png";
    import deleteIcon from "./delete.png";
    import "./userTable.css"
    import { useState } from "react";
    import {useSnackbar} from "notistack"

    function UserTable({
    users,
    selectedRows,
    handleCheckboxChange,
    handleDeleteSelected,
    handleEditUser,
    handleDeleteUser
    }) {


    const [editUserData, setEditUserData] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleEditClick = (user) =>{
        setEditUserData(user);
    }

    const handleSaveEdit = (user) =>{
        handleEditUser(user.id, user);
        setEditUserData(null);
        enqueueSnackbar("User data updated successfully!", {
            variant: "success"
        });
    }
    return (
        <table>
        <thead>
            <tr>
            <th>
                <input
                className="checkbox"
                type="checkbox"
                checked={selectedRows.length === users.length}
                onChange={() => handleCheckboxChange("selectAll")}
                />
            </th>
            <th>
                <h4>Name</h4>
            </th>
            <th>
                <h4>Email</h4>
            </th>
            <th>
                <h4>Role</h4>
            </th>
            <th>
                <h4>Actions</h4>
            </th>
            </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
            <td>
              {editUserData?.id === user.id ? (
                <input
                  value={editUserData.name}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, name: e.target.value })
                  }
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editUserData?.id === user.id ? (
                <input
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editUserData?.id === user.id ? (
                <input
                  value={editUserData.role}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, role: e.target.value })
                  }
                />
              ) : (
                user.role
              )}
            </td>
            <td>
              {editUserData?.id === user.id ? (
                <>
                  <button onClick={() => handleSaveEdit(editUserData)}>
                    Save
                  </button>
                  <button onClick={() => setEditUserData(null)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(user)}>
                  <img src={editIcon} alt="Edit" className="icon" />
                </button>
              )}
              <button onClick={() => handleDeleteUser(user.id)}>
                <img src={deleteIcon} alt="Delete" className="icon" />
              </button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
            <td colSpan="4">
                <button
                class="button-1"
                role="button"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
                >
                Delete Selected
                </button>
            </td>
            </tr>
        </tfoot>
        </table>
    );
    }

    export default UserTable;
