import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
//import { getUsers, deleteUser } from "../Services/api";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  table: {
    border: "10px",
    width: "90%",
    margin: "50px 0 0 50px",
  },
  thread: {
    "& > *": {
      background: "ffffff",
      color: "#000000",
      fontSize: 20,
    },
  },
  row: {
    "& > *": {
      background: "#f2f4f7",
      color: "#20232a",
      fontSize: 20,
    },
  },
});

function AllUsers() {
  const [users, setUsers] = useState([]);
  const classes = useStyle();
  //  const navigate = useNavigate();
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
  // const handleClick = (user) => {
  //   console.log("value of paramms", user);
  //   navigate("/edit/${user}");
  // };

  return (
    <div>
      <div className="Searchh">
        <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setsearchItem(event.target.value);
          }}
        />
      </div>
      <Table className={classes.table} style={{ border: "10px" }}>
        <TableHead>
          <TableRow className={classes.thread}>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>EmailID</TableCell>
            {/* <TableCell>Password</TableCell> */}
            <TableCell>Occupation</TableCell>
            <TableCell>Preferences</TableCell>

            <TableCell></TableCell>
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
            .map((user) => (
              <TableRow className={classes.row}>
                {/* <TableCell>{user._id}</TableCell> */}
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>{user.password}</TableCell> */}
                <TableCell>{user.occupation}</TableCell>
                <TableCell>{user.preferences}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10, backgroundColor: "#000000" }}
                    component={Link}
                    to={`/users/edit/${user._id}`}
                    // onClick={() => handleClick(user._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => deleteUserData(user._id)}
                    style={{ marginRight: 10, backgroundColor: "#000000" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AllUsers;
