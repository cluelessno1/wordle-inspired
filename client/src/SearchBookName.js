import React from 'react';
import InputField from './InputField';
import DisplaySearchResult from './DisplaySearchResult';

export default function SearchBookName({ bookDetails, setBookDetails }) {
    return (
        <>
            {bookDetails.length}
            <InputField setBookDetails={setBookDetails}/>
            <DisplaySearchResult bookDetails={bookDetails} />
        </>
    );
}
