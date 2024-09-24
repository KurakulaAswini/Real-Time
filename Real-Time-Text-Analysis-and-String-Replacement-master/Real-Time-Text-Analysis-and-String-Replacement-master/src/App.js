// Author: Bhavdeep Singh Nijhawan

import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [replaceFrom, setReplaceFrom] = useState('');
  const [replaceTo, setReplaceTo] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const countUniqueWords = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  const countCharactersExcludingSpaces = () => {
    const characters = text.replace(/[^a-zA-Z0-9]/g, '');
    return characters.length;
  };

  const handleReplaceAll = () => {
    if (!replaceFrom) return;
    const regex = new RegExp(replaceFrom, 'g');
    const replacedText = text.replace(regex, replaceTo);
    setText(replacedText);

    const highlighted = replacedText.replace(
      regex,
      `<mark>${replaceTo}</mark>`
    );
    setHighlightedText(highlighted);
  };

  return (
    <div className="App">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      <textarea
        value={text}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        placeholder="Type or paste your text here..."
      />

      <div className="statistics">
        <p>Unique Word Count: {countUniqueWords()}</p>
        <p>
          Character Count (Excluding Spaces and Punctuation):{' '}
          {countCharactersExcludingSpaces()}
        </p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          placeholder="Find"
          value={replaceFrom}
          onChange={(e) => setReplaceFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceTo}
          onChange={(e) => setReplaceTo(e.target.value)}
        />
        <button onClick={handleReplaceAll}>Replace All</button>
      </div>

      {highlightedText && (
        <div className="highlighted-text">
          <h3>Highlighted Replaced Text:</h3>
          <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
        </div>
      )}
    </div>
  );
}

export default App;