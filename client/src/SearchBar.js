import React from 'react';
import AsyncSelect from 'react-select/async';

export default function SearchBar({selectedOption , setSelectedOption}) {

    // https://www.cluemediator.com/react-select-async-dropdown-using-search-api
    // Refered the above to understand Async react select

    

    // handle selection
    const handleChange = value => {
        setSelectedOption(value);
        console.log("The selected value is : ");
        console.log(value);
    }

    // load options using API call
    const loadOptions = (inputValue) => {
        const searchTerm = inputValue;
        // bookNameRef.current.value = null;
        if (searchTerm === '') {
            return [];
        }
        console.log(searchTerm);

        // https://stackoverflow.com/questions/46493116/react-select-with-async-failing-to-load-options?rq=1
        // Fetch call and all was working but was not getting options field populated. Above is the answer as to why the issue was occuring and what's the solution.
        return fetch("http://localhost:5000/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: searchTerm }),
        })
            .then(response => response.json())
            .then(bookDetails => {
                console.log(bookDetails);
                return (bookDetails.map(bookDetail => ({ value: bookDetail._id, label: bookDetail.title + ' by ' + bookDetail.author })));
            })
            .catch(error => {
                window.alert(error);
                return [];
            });

    }

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            placeholder={'Search...'}
            value={selectedOption}
            getOptionLabel={e => e.label}
            getOptionValue={e => e.value}
            loadOptions={loadOptions}
            onChange={handleChange}
        />
    )
}
