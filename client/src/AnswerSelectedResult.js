import React from 'react'

export default function AnswerSelectedResult({ answerSelected }) {

    let x;
    if (answerSelected) {
        x = answerSelected.label;
    } else {
        x ="nothing selected";
    }

  return (
    <div>{x}</div>
  )
}
