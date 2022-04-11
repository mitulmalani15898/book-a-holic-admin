/** Author : JAINAM SHAH
 */

import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const useStyle = makeStyles({
  table: {
    border: "1px solid #f2f4f7 !important",
    overflow: "auto",
  },
  thread: {
    "& > *": {
      background: "#f2f4f7",
      color: "#000000",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  row: {
    "& > *": {
      color: "#20232a",
      fontSize: 16,
    },
  },
});

function AllUsers() {
  const [users, setUsers] = useState([]);
  const classes = useStyle();
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await getUsers();
    console.log(response);
    setUsers(response.data);
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  return (
    <Container>
      <div className="Searchh">
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setsearchItem(event.target.value);
          }}
        />
      </div>
      <div className="users-table-container">
        <Table className={classes.table} style={{ border: "10px" }}>
          <TableHead>
            <TableRow className={classes.thread}>
              <TableCell>#</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>EmailID</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Preferences</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => {
                if (searchItem === "") {
                  return user;
                } else if (
                  user.firstName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  user.lastName.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user, i) => (
                <TableRow className={classes.row} key={user._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Link to={`/users/edit/${user._id}`}>
                      <FontAwesomeIcon icon={faEdit} color="#0166b2" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      icon={faTrashAlt}
                      color="#db1818"
                      onClick={() => deleteUserData(user._id)}
                    />
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>{user.password}</TableCell> */}
                  <TableCell>{user.occupation}</TableCell>
                  <TableCell>{user.preferences}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}

export default AllUsers;
