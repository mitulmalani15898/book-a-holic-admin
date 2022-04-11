import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import axios from "../../http-common";

import "./login.css";
import { Alert } from "react-bootstrap";

const emailRegex = /\S+@\S+\.\S+/;

const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !emailRegex.test(email)) {
      return setErrorMessage("Please provide valid email address.");
    }
    if (!password) {
      return setErrorMessage("Please provide password.");
    }
    setErrorMessage("");
    try {
      const res = await axios.post("/admin/login", userDetails);
      console.log("res", res);
      if (res.status === 200 && res.data.success) {
        Cookies.set("email", email, { path: "" });
        navigate("/", { replace: true });
      }
    } catch (error) {
      setErrorMessage("Incorrect username or password.");
      setUserDetails({
        email: "",
        password: "",
      });
    }
  };

  const { email, password } = userDetails;

  return (
    <Container className="login-container">
      <div className="login-wrapper">
        <Form onSubmit={handleSubmit} noValidate>
          <h3 className="login-title">Login</h3>
          {errorMessage && (
            <Alert variant="danger" className="p-2 mt-3 mb-2">
              {errorMessage}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 my-2">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
