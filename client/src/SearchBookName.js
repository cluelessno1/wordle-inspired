import React, { useState } from 'react';
import AnswerSelectedResult from './AnswerSelectedResult';
import PhotoClue from './PhotoClue';
import SearchBar from './SearchBar';

export default function SearchBookName() {

    const [answer, setAnswer] = useState(null);

    return (
        <>
            <PhotoClue></PhotoClue>
            <SearchBar selectedOption={answer} setSelectedOption={setAnswer}></SearchBar>
            <AnswerSelectedResult answerSelected={answer}></AnswerSelectedResult>
        </>
    );
}
