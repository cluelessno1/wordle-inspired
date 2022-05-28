import React, { useRef } from 'react'

// 2 issues to check out are: 
// 1) When backspace is pressed and the contetnts of the field are quickly erased, sometimes the state remains to the one it was before the input field became '', and those results are displayed on the screen.
// 2) Pressing enter button in the input field doesn't seem act like the submit button was clicked.

export default function InputField({ setBookDetails }) {
    const bookNameRef = useRef()

    async function searchForBookName(e) {
        const searchTerm = bookNameRef.current.value;
        // bookNameRef.current.value = null;
        if (searchTerm === '') {
            setBookDetails([]);
            return; 
        }
        console.log(searchTerm);

        await fetch("http://localhost:5000/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: searchTerm }),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setBookDetails(data);
        })
        .catch(error => {
            window.alert(error);
            return;
        });

    }

    return (
        <div>
            <label>Enter Book Name</label>
            <input ref={bookNameRef} type="text" onChange={searchForBookName} />
            <button onClick={searchForBookName}>Search</button>
        </div>
    )
}
