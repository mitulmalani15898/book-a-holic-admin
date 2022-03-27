import React, { useState, useEffect } from "react";

import {
  Button,
  Alert,
  Table,
  Pagination,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { create, edit } from "../../services/books.service";
import "./addbook.css";

function AddBook() {
  const navigate = useNavigate();
  const { state: book } = useLocation();
  console.log(book);
  const [addBook, setAddBook] = useState({
    title: book?.title || "",
    _id: book?._id || "",
    category: book?.category || "",
    bookDescription: book?.bookDescription || "",
    author: book?.author || "",
    isbn: book?.isbn || "",
    year: book?.year || "",
    price: book?.price ? book?.price+"" : "",
    actualPrice: book?.actualPrice || "",
    image: "",
    book: "",
    header: book?._id ? "Edit Book" : "Add Book",
    button: book?._id ? "Edit" : "Add",
  });
  const [apiError, setApiError] = useState(false);

  const [errors, setErrors] = useState({});

  const findErrorInBookForm = () => {
    const {
      _id,
      title,
      category,
      bookDescription,
      author,
      isbn,
      year,
      price,
      actualPrice,
    } = addBook;
    const errors = {};
    // title
    if (!title || title.trim() === "") {
      errors.title = "title cannot be blank";
    }
    if (!category || category.trim() === "") {
      errors.category = "category cannot be blank";
    }
    if (!bookDescription || bookDescription.trim() === "") {
      errors.bookDescription = "bookDescription cannot be blank";
    }
    if (!author || author.trim() === "") {
      errors.author = "author cannot be blank";
    }
    if (!isbn || isbn.trim() === "") {
      errors.isbn = "isbn cannot be blank";
    }
    if (!year || year.trim() === "") {
      errors.year = "year cannot be blank";
    }

    if (!price === "") {
      errors.price = "price cannot be blank";
    }
    if (!actualPrice === "") {
      errors.actualPrice = "actual price cannot be blank";
    }

    console.log(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handling submit");
    const errorsFound = findErrorInBookForm();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
    } else {
      alert("Submitting the form");
      const formData = new FormData();
      formData.append("files", addBook.image);
      formData.append("files", addBook.book);
      formData.append("title", addBook.title);
      formData.append("category", addBook.category);
      formData.append("bookDescription", addBook.bookDescription);
      formData.append("author", addBook.author);
      formData.append("isbn", addBook.isbn);
      formData.append("year", addBook.year);
      formData.append("price", addBook.price);
      formData.append("actualPrice", addBook.actualPrice);

      if (addBook.header === "Add Book") {
        let addApiResponse = await create(formData);
        if (addApiResponse.status === 200) {
          navigate("/");
        } else {
          setApiError(true);
        }
        console.log(addApiResponse);
      } else {
        console.log("Editing book");
        formData.append("_id", addBook._id);
        const editApiResponse = await edit(addBook);
        if (editApiResponse.status === 200) {
          navigate("/");
        } else {
          setApiError(true);
        }
        console.log(editApiResponse);
      }
      // create(addBook);
    }
  };

  return (
    <div className="addbook-container">
      <h3 className="addbook-title">{addBook.header}</h3>
      {apiError && (
        <Alert variant="danger" dismissible onClose={() => setApiError(false)}>
          Something went wrong, please try again later
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          {" "}
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={addBook.title}
                type="text"
                placeholder="Enter Title"
                isInvalid={!!errors.title}
                onChange={(event) => {
                  setAddBook({ ...addBook, title: event.target.value });
                  if (!!errors.title) {
                    setErrors({ ...errors, title: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label = "Select Category"
                value = {addBook.category}
                isInvalid={!!errors.category}
                onChange={(event) => {
                  setAddBook({ ...addBook, category: event.target.value });   
                  if (!!errors.category) {
                    setErrors({ ...errors, category: null });
                  }
                }}
              >
                <option>Select Category</option>
                <option>Mystery</option>
                <option>Literature</option>

              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter Description"
                value={addBook.bookDescription}
                isInvalid={!!errors.bookDescription}
                onChange={(event) => {
                  setAddBook({
                    ...addBook,
                    bookDescription: event.target.value,
                  });
                  if (!!errors.bookDescription) {
                    setErrors({ ...errors, bookDescription: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.bookDescription}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author Name"
                value={addBook.author}
                isInvalid={!!errors.author}
                onChange={(event) => {
                  setAddBook({ ...addBook, author: event.target.value });
                  if (!!errors.author) {
                    setErrors({ ...errors, author: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.author}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN"
                value={addBook.isbn}
                isInvalid={!!errors.isbn}
                onChange={(event) => {
                  setAddBook({ ...addBook, isbn: event.target.value });
                  if (!!errors.isbn) {
                    setErrors({ ...errors, isbn: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.isbn}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={addBook.year}
                isInvalid={!!errors.year}
                onChange={(event) => {
                  setAddBook({ ...addBook, year: event.target.value });
                  if (!!errors.year) {
                    setErrors({ ...errors, year: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={addBook.price}
                isInvalid={!!errors.price}
                onChange={(event) => {
                  setAddBook({ ...addBook, price: event.target.value });
                  if (!!errors.price) {
                    setErrors({ ...errors, price: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Actual Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Actual Price"
                value={addBook.actualPrice}
                isInvalid={!!errors.actualPrice}
                onChange={(event) => {
                  setAddBook({ ...addBook, actualPrice: event.target.value });
                  if (!!errors.actualPrice) {
                    setErrors({ ...errors, actualPrice: null });
                  }
                }}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.actualPrice}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Thumbnail Image</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                onChange={(event) =>
                  setAddBook({ ...addBook, image: event.target.files[0] })
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="addbook-element">
              <Form.Label>Book Pdf</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                onChange={(event) =>
                  setAddBook({ ...addBook, book: event.target.files[0] })
                }
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="addbook-submit-buttons">
            <Button className="submit" value="submit" type="submit">
              {addBook.button}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default AddBook;
