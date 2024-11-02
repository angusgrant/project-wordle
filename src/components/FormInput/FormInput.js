

import React, { useState } from 'react';

function FormInput({ onFormSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(input);
    setInput('')
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input id="guess-input" type="text" value={input} onChange={handleChange} pattern="[A-Z]{5}" minLength="5" maxLength="5" length="5" required />

    </form>
  );
}

export default FormInput;
