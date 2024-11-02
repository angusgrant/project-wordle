import React, { useState } from 'react';

import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';


// Pick a random word on every pageload.

const NUM_LETTERS = 5;
// To make debugging easier, we'll log the solution in the console.

function Game({ inputValues, answer, onWin, onLose }) {
    const rows = [];
    let results = [];
    let correctLetters = [];
    let missPlacedLetters = [];
    function letterStatus(letter) {
      // If the letter is in the correctLetters array, return 'correct'. 
      // if not in the correctLetters array but in the missPlacedLetters array, return 'misplaced'. 
      // Otherwise, return an empty string.
        if (correctLetters.includes(letter)) {
            return 'correct';
        } else if (missPlacedLetters.includes(letter)) {
            return 'misplaced';
        } else {
            return '';
        }
    }
    for (let i= 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
        const value = inputValues[i] || '';
        const result = checkGuess(value, answer);
        results = [...results, result];

        correctLetters = [...new Set((results || [])
            .flatMap(subArray => subArray ? subArray.filter(item => item.status === "correct") : [])
            .map(item => item.letter)
        )];
        missPlacedLetters = [...new Set((results || [])
            .flatMap(subArray => subArray ? subArray.filter(item => item.status === "misplaced") : [])
            .map(item => item.letter)
        )];
        console.log(missPlacedLetters);


        const cells = [];
        let correctLetterCount = 0;
        for (let j = 0; j < NUM_LETTERS; j++) {
            if (result && result[j].status === 'correct') {
                correctLetterCount++;
                //correctLetterArray.push(result[j].letter);
            }
            if (correctLetterCount === NUM_LETTERS) {
                onWin();
            }
            if (inputValues && inputValues[NUM_OF_GUESSES_ALLOWED - 1] && correctLetterCount !== NUM_LETTERS) {
                onLose();
            }
            cells.push(
                <span key={j} className={`cell ${result && result[j].status ? result[j].status : ''}`}>
                    {result && result[j] && result[j].letter ? result[j].letter : ''}
                </span>
                );
        }
        rows.push(
            <div key={i} className="guess">
                {cells}
            </div>
        );
    }
    return (
         <>
            <div className="guess-results">
                {rows}
            </div>
            <div className="keyboard">
              <div className="row">
                <button className={'key ' + letterStatus('Q')}>Q</button>
                <button className={'key ' + letterStatus('W')}>W</button>
                <button className={'key ' + letterStatus('E')}>E</button>
                <button className={'key ' + letterStatus('R')}>R</button>
                <button className={'key ' + letterStatus('T')}>T</button>
                <button className={'key ' + letterStatus('Y')}>Y</button>
                <button className={'key ' + letterStatus('U')}>U</button>
                <button className={'key ' + letterStatus('I')}>I</button>
                <button className={'key ' + letterStatus('O')}>O</button>
                <button className={'key ' + letterStatus('P')}>P</button>
              </div>
              <div className="row">
                <button className={'key ' + letterStatus('A')}>A</button>
                <button className={'key ' + letterStatus('S')}>S</button>
                <button className={'key ' + letterStatus('D')}>D</button>
                <button className={'key ' + letterStatus('F')}>F</button>
                <button className={'key ' + letterStatus('G')}>G</button>
                <button className={'key ' + letterStatus('H')}>H</button>
                <button className={'key ' + letterStatus('J')}>J</button>
                <button className={'key ' + letterStatus('K')}>K</button>
                <button className={'key ' + letterStatus('L')}>L</button>
              </div>
              <div className="row">
                <button className={'key ' + letterStatus('Z')}>Z</button>
                <button className={'key ' + letterStatus('X')}>X</button>
                <button className={'key ' + letterStatus('C')}>C</button>
                <button className={'key ' + letterStatus('V')}>V</button>
                <button className={'key ' + letterStatus('B')}>B</button>
                <button className={'key ' + letterStatus('N')}>N</button>
                <button className={'key ' + letterStatus('M')}>M</button>
              </div>
            </div>
        </>
    );
  }


export default Game;
