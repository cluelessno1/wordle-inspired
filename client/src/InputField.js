import React, { useRef } from 'react'

export default function InputField({ setBookDetails }) {
    const bookNameRef = useRef()

    async function searchForBookName(e) {
        const searchTerm = bookNameRef.current.value;
        bookNameRef.current.value = null;
        if (searchTerm === '') return;
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
            console.log(data);
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
            <input ref={bookNameRef} type="text" />
            <button onClick={searchForBookName}>Search</button>
        </div>
    )
}
