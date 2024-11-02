import React, { useState } from 'react';
import Game from '../Game';
import Header from '../Header';
import FormInput from '../FormInput';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { sample } from '../../utils';
import { WORDS } from '../../data';

const answer = sample(WORDS);
console.info('The answer is:', answer);


function App() {
  const [inputValues, setInputValues] = useState([]);
  const [youWin, setYouWin] = useState(false);
  const [youLose, setYouLose] = useState(false);

  const handleFormSubmit = (value) => {
    setInputValues(prevValues => [...prevValues, value]);
  };
  
  const handleWin = () => {
    setYouWin(true);
  };

    const handleLose = () => {
        setYouLose(true);
    };

  return (
    <div className="wrapper">
      <Header />
      <div className="game-wrapper">
        <Game inputValues={inputValues} answer={answer} onWin={handleWin} onLose={handleLose}  />
      
        <FormInput onFormSubmit={handleFormSubmit} />
      </div>
      {youWin && (
                <div className="happy banner">
                    <p>
                        <strong>Congratulations!</strong> Got it in 
                        <strong> {NUM_OF_GUESSES_ALLOWED} guesses</strong>.
                    </p>
                </div>
        )}
        {youLose && (
                <div className="sad banner">
                    <p>
                        <strong>Sorry, you lost!</strong> The answer was:
                        <strong> {answer}</strong>.
                    </p>
                </div>
            )}
    </div>
  );
}


export default App;
