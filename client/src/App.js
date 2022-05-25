import React, {useState} from "react";
import SearchBookName from "./SearchBookName";

function App() {

  const [bookDetails, setBookDetails] = useState([{_id: 1, title: "Harry Potter", author: "JK Rowling"}])

  return (
    <SearchBookName bookDetails={bookDetails} setBookDetails={setBookDetails}/>
  );
}

export default App;
