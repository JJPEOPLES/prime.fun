import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SpeedTyping = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog near the riverbank on a sunny afternoon.",
    "Programming is like solving puzzles while building something amazing at the same time.",
    "Creativity and logic come together when you write code that makes people happy.",
    "Every great developer started as a beginner who was willing to learn and practice.",
    "The best way to predict the future is to create it through innovative technology.",
    "Coding is not just about writing instructions; it's about solving real problems.",
    "Practice makes perfect, especially when learning to type faster and more accurately."
  ];

  const generateNewText = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsStarted(false);
    setWpm(0);
    setAccuracy(100);
  }, []);

  const startTest = () => {
    if (!text) generateNewText();
    setUserInput('');
    setStartTime(Date.now());
    setEndTime(null);
    setIsStarted(true);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    if (!isStarted) {
      setStartTime(Date.now());
      setIsStarted(true);
    }

    setUserInput(value);

    if (value === text) {
      setEndTime(Date.now());
      setIsStarted(false);
    }
  };

  const calculateStats = useCallback(() => {
    if (!startTime || !userInput) return;

    const currentTime = endTime || Date.now();
    const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
    const wordsTyped = userInput.split(' ').length;
    const calculatedWpm = Math.round(wordsTyped / timeElapsed) || 0;
    
    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    const calculatedAccuracy = userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 100;
    
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  }, [startTime, userInput, endTime, text]);

  useEffect(() => {
    if (isStarted && userInput) {
      calculateStats();
    }
  }, [userInput, isStarted, calculateStats]);

  useEffect(() => {
    generateNewText();
  }, [generateNewText]);

  const getCharacterColor = (index) => {
    if (index >= userInput.length) return '#666';
    return userInput[index] === text[index] ? '#22c55e' : '#ef4444';
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Speed Typing Test</h1>
          <p>Test your typing speed and accuracy!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center', margin: '10px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                  {wpm}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>WPM</div>
              </div>
              <div style={{ textAlign: 'center', margin: '10px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>
                  {accuracy}%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Accuracy</div>
              </div>
              <div style={{ textAlign: 'center', margin: '10px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                  {userInput.length}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Characters</div>
              </div>
            </div>

            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #e9ecef',
              marginBottom: '20px'
            }}>
              <h4>Type this text:</h4>
              <div style={{ 
                fontSize: '1.2rem',
                lineHeight: '1.6',
                fontFamily: 'monospace',
                marginBottom: '15px'
              }}>
                {text.split('').map((char, index) => (
                  <span 
                    key={index}
                    style={{ 
                      backgroundColor: index === userInput.length ? '#ffeb3b' : 'transparent',
                      color: getCharacterColor(index)
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  resize: 'none'
                }}
                disabled={endTime !== null}
              />
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={startTest}>
                {isStarted ? 'Restart Test' : 'Start Test'}
              </button>
              <button className="btn btn-secondary" onClick={generateNewText}>
                New Text
              </button>
            </div>

            {endTime && (
              <div style={{ 
                marginTop: '20px',
                padding: '20px',
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3>Test Complete! 🎉</h3>
                <p>Final Speed: <strong>{wpm} WPM</strong></p>
                <p>Final Accuracy: <strong>{accuracy}%</strong></p>
                <p>Time: <strong>{((endTime - startTime) / 1000).toFixed(1)} seconds</strong></p>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Typing Tips</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Keep your fingers on the home row (ASDF JKL;)</li>
              <li>Use all your fingers - don't just hunt and peck</li>
              <li>Focus on accuracy first, speed will come naturally</li>
              <li>Practice regularly to build muscle memory</li>
              <li>Maintain good posture while typing</li>
              <li>Don't look at the keyboard - trust your fingers!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTyping;