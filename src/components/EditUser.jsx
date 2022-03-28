/** Author : JAINAM SHAH
 */
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  makeStyles,
  Typography,
} from "@material-ui/core";

//   import { editUser, getUsers } from "../Service/api";
import { editUser, getUsers } from "../services/api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useStyle = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  occupation: "",
  preferences: "",
};

function EditUser() {
  const [user, setUser] = useState(initialValues);
  // const [firstName, lastName, email] = user;
  const navigate = useNavigate();
  const classes = useStyle();
  const { id } = useParams();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const response = await getUsers(id);
    // console.log("id value", id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("userdetails", user);
  };

  //  const url = "http://127.0.0.1:8081/api/users";
  const editUserDetails = async () => {
    await editUser(id, user);
    // navigate("/users");
    navigate("/users");
  };
  //   const addUserDetails = async () => {
  //     await addUser(user);
  //     navigate("/all");
  //   };
  return (
    <FormGroup className={classes.container}>
      <Typography variant="h3">Edit User</Typography>
      <FormControl>
        <InputLabel>FirstName</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="firstName"
          value={user.firstName}
        />
      </FormControl>
      <FormControl>
        <InputLabel>LastName</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="lastName"
          value={user.lastName}
        />
      </FormControl>
      <FormControl>
        <InputLabel>EmailID</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Occupation</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="occupation"
          value={user.occupation}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Preferences</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="preferences"
          value={user.preferences}
        />
      </FormControl>
      <Button
        variant="contained"
        onClick={() => editUserDetails()}
        color="primary"
      >
        Edit User
      </Button>
    </FormGroup>
  );
}

export default EditUser;
