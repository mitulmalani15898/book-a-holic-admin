/** @author Prit Thakkar (B00890731)*/ 

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./search-input.css";

/**
 * 
 * @param {search, handleChange} for the search input and handling the onChange event 
 * @returns the search component used in searching books.
 */
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
