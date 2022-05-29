import React from 'react'

export default function BookDetail({ bookDetail }) {
  return (
    <div>{bookDetail.title} by {bookDetail.author}</div>
  )
}
