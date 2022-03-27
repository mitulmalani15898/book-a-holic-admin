import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./search-input.css";

function SearchInput({ search, handleChange }) {
  

  return (
    <Form.Control
      type="text"
      className="search-input"
      placeholder="Search for book"
      value={search}
      onChange={handleChange}
    />
  );
}

export default SearchInput;
