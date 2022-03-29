/** @author Prit Thakkar (B00890731)*/ 

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Table, Pagination } from "react-bootstrap";
import SearchInput from "../../components/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAll } from "../../services/books.service";
import "./books.css";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteBookModal from "../../components/DeleteBookModal";
import { remove } from "../../services/books.service";
/** 
 * @returns the book component, which is essentially a responsive table showing all the books 
 * available in the database.
 * 
 */
function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [bookToBeDeleted,setBookToBeDeleted] = useState("");
  const [isError,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleDeleteClick = (bookId) => () =>{
    console.log(bookId);
    console.log("here");
    toggleModal();
    setBookToBeDeleted(bookId);
  }

  const handleBookDelete = async () =>  {
    console.log("Bokkde");
    const response = await remove(bookToBeDeleted);
    setFilteredBooks(prev=>prev.filter(item=>item._id!=bookToBeDeleted));
    setBookToBeDeleted("");
    toggleModal();
  }
  const getDataFromBookApi = async () => {
    try {
      const booksFromApi = await getAll();
      console.log(booksFromApi.data);
      setBooks(booksFromApi.data.data);
      setFilteredBooks(booksFromApi.data.data);      
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
    }
  };

  const handleSearchChange = (event) => {
    const s = event.target.value;
    setSearch(s);
    const results = books.filter((book) =>
      String(book.title).toLowerCase().includes(s.toLowerCase())
    );
    setFilteredBooks(results);
  };

  const renderBookTableData = () => {
    return filteredBooks.map((book, index) => {
      const {
        _id,
        title,
        category,
        bookDescription,
        author,
        isbn,
        price,
        year,
        imageUrl,
        bookUrl,
      } = book;
      return (
        <tr key={_id}>
          <td>{title}</td>
          <td>{category}</td>
          <td className="td">{bookDescription}</td>
          <td>{author}</td>
          <td>{isbn}</td>
          <td>{price}</td>
          <td>{year}</td>
          <td>{imageUrl}</td>
          <td>{bookUrl}</td>
          <td>
            <Link to="/books/edit" state={book}>
              <FontAwesomeIcon icon={faEdit} color="#5946c2" />
            </Link>
          </td>
          <td>
            <FontAwesomeIcon icon={faTrashAlt} color="#f04a3a" onClick={handleDeleteClick(book._id)} />
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getDataFromBookApi();
  }, []);

  return (
    <>
      <DeleteBookModal show={openModal} handleClose={toggleModal} handleBookDelete={handleBookDelete} />
      <div className="book-container">
        <h3 className="title">Books</h3>
        <div className="books-header">
          <Link to="/books/add">
            <Button variant="dark">Add book</Button>
          </Link>
          <SearchInput search={search} handleChange={handleSearchChange} />
        </div>
        <div className="books-table-container">
          {/* {addBook && <Alert variant="success" dismissible onClose={() => setAddBook(false)}>Book added.</Alert>}
        {editBook && <Alert variant="info" dismissible onClose={() => setEditBook(false)}>Book edited.</Alert>}
        {deleteBook && <Alert variant="danger" dismissible onClose={() => setDeleteBook(false)}>Book deleted.</Alert>} */}
        {isError && <Alert variant="danger" dismissible onClose={() => setError(false)}>{errorMessage}</Alert>}
          <Table striped bordered hover size="sm" className="books-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Category ID</th>
                <th className="td">Description</th>
                <th>Author Name</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Year</th>
                <th>Image URL</th>
                <th>Book URL</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderBookTableData()}</tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Books;
