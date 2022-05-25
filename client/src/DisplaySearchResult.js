import React from 'react'
import BookDetail from './BookDetail'

export default function DisplaySearchResult({ bookDetails }) {
  return (
    bookDetails.map(bookDetail => {
        return <BookDetail key={bookDetail._id} bookDetail={bookDetail} />
    })
  )
}
