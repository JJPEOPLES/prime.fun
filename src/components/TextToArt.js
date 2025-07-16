import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TextToArt = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [asciiArt, setAsciiArt] = useState('');

  const fonts = {
    block: {
      'A': ['█████', '█   █', '█████', '█   █', '█   █'],
      'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
      'C': ['█████', '█    ', '█    ', '█    ', '█████'],
      'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
      'E': ['█████', '█    ', '███  ', '█    ', '█████'],
      'F': ['█████', '█    ', '███  ', '█    ', '█    '],
      'G': ['█████', '█    ', '█ ███', '█   █', '█████'],
      'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
      'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
      'J': ['█████', '    █', '    █', '█   █', '█████'],
      'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
      'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
      'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
      'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
      'O': ['█████', '█   █', '█   █', '█   █', '█████'],
      'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
      'Q': ['█████', '█   █', '█   █', '█  ██', '█████'],
      'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
      'S': ['█████', '█    ', '█████', '    █', '█████'],
      'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
      'U': ['█   █', '█   █', '█   █', '█   █', '█████'],
      'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
      'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
      'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
      'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
      'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
      ' ': ['     ', '     ', '     ', '     ', '     ']
    }
  };

  const generateAsciiArt = () => {
    if (!inputText.trim()) {
      setAsciiArt('Please enter some text!');
      return;
    }

    const text = inputText.toUpperCase();
    const lines = ['', '', '', '', ''];
    
    for (let char of text) {
      const pattern = fonts.block[char] || fonts.block[' '];
      for (let i = 0; i < 5; i++) {
        lines[i] += pattern[i] + ' ';
      }
    }
    
    setAsciiArt(lines.join('\n'));
  };

  const copyArt = () => {
    navigator.clipboard.writeText(asciiArt);
    alert('ASCII Art copied to clipboard!');
  };

  const generateRandomText = () => {
    const phrases = [
      'HELLO',
      'PRIME',
      'FUN',
      'COOL',
      'AWESOME',
      'CODE',
      'ART',
      'MAGIC'
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setInputText(randomPhrase);
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Text to ASCII Art</h1>
          <p>Transform your text into cool ASCII art!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <h3>Create Your ASCII Art</h3>
            
            <div className="input-group">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here..."
                maxLength="10"
                style={{ minWidth: '250px' }}
              />
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={generateAsciiArt}>
                Generate ASCII Art
              </button>
              <button className="btn btn-secondary" onClick={generateRandomText}>
                Random Text
              </button>
              {asciiArt && (
                <button className="btn btn-secondary" onClick={copyArt}>
                  Copy Art
                </button>
              )}
            </div>

            {asciiArt && (
              <div className="result-display">
                <pre style={{ 
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  lineHeight: '1.2',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {asciiArt}
                </pre>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>ASCII Art Fun Facts</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>ASCII art was popular in early computer systems and bulletin boards</li>
              <li>It uses only text characters to create images and designs</li>
              <li>Great for adding style to plain text messages</li>
              <li>Works best with monospace fonts (like Courier)</li>
              <li>Can be used in emails, forums, and social media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToArt;