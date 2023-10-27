import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./searchBar";
import UserTable from "./userTable";
import Pagination from "@mui/material/Pagination";
import "./App.css";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";
import { useSnackbar} from "notistack"

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUsers(response.data);
      } catch (error) {
        enqueueSnackbar("Error fetching data. Please try again later.", {
          variant: "error"
        });
      }
    };
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchItem(term);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (id === "selectAll") {
        if (prevSelectedRows.length === currentUsers.length) {
          return [];
        } else {
          return currentUsers.map((user) => user.id);
        }
      } else {
        if (prevSelectedRows.includes(id)) {
          return prevSelectedRows.filter((rowId) => rowId !== id);
        } else {
          return [...prevSelectedRows, id];
        }
      }
    });
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.role.toLowerCase().includes(searchItem.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleEditUser = (id, updatedUserData) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedUserData } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <UserTable
        users={currentUsers}
        selectedRows={selectedRows}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteSelected={handleDeleteSelected}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
        editIcon={editIcon}
        deleteIcon={deleteIcon}
      />
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          variant="outlined"
          color="secondary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
