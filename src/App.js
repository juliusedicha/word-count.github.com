import React, { useState } from 'react';
import './styles.css';
import './additionalStyles.css';

function App() {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(value);
    setCharacterCount(value.length);
    setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleClearClick = () => {
    setText('');
    setCharacterCount(0);
    setWordCount(0);
  };

  const handleParaphraseClick = () => {
    const paraphraseWindow = window.open('https://quillbot.com/', '_blank');
    if (paraphraseWindow) {
      paraphraseWindow.onload = () => {
        paraphraseWindow.postMessage({ text }, 'https://quillbot.com/');
      };
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`container ${theme}`}>
      <div className="theme-toggle-container">
        <button className={`theme-toggle-button ${theme}`} onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
        </button> 
      </div>
      <h1>Word Count & Paraphrasing</h1>
      <textarea
        className={`text-input ${theme}`}
        value={text}
        onChange={handleTextChange}
        placeholder="Type or paste something..."
      />
      <div className="counts">
        <p className={`character-count ${theme}`}>Character Count: {characterCount}</p>
        <p className={`word-count ${theme}`}>Word Count: {wordCount}</p>
      </div>
      <div className="buttons">
        <button className={`clear-button ${theme}`} onClick={handleClearClick}>
          Clear
        </button>
        <button className={`paraphrase-button ${theme}`} onClick={handleParaphraseClick}>
          Paraphrase
        </button>
      </div>
    </div>
  );
}

export default App;
