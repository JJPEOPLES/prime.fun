import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NumberGuesser = () => {
  const navigate = useNavigate();
  const [targetNumber, setTargetNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [difficulty, setDifficulty] = useState('medium');

  const difficultySettings = {
    easy: { min: 1, max: 50, maxAttempts: 10 },
    medium: { min: 1, max: 100, maxAttempts: 8 },
    hard: { min: 1, max: 200, maxAttempts: 6 }
  };

  const startNewGame = () => {
    const settings = difficultySettings[difficulty];
    const newTarget = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
    setTargetNumber(newTarget);
    setMinRange(settings.min);
    setMaxRange(settings.max);
    setUserGuess('');
    setAttempts(0);
    setGameOver(false);
    setMessage(`I'm thinking of a number between ${settings.min} and ${settings.max}. You have ${settings.maxAttempts} attempts!`);
    setGuessHistory([]);
  };

  const makeGuess = () => {
    const guess = parseInt(userGuess);
    const settings = difficultySettings[difficulty];
    
    if (isNaN(guess) || guess < minRange || guess > maxRange) {
      setMessage(`Please enter a valid number between ${minRange} and ${maxRange}!`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    const guessResult = {
      number: guess,
      attempt: newAttempts,
      hint: ''
    };

    if (guess === targetNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`);
      setGameOver(true);
      guessResult.hint = 'Correct!';
    } else if (newAttempts >= settings.maxAttempts) {
      setMessage(`😞 Game Over! The number was ${targetNumber}. Better luck next time!`);
      setGameOver(true);
      guessResult.hint = `Too ${guess > targetNumber ? 'high' : 'low'} - Game Over`;
    } else {
      const remainingAttempts = settings.maxAttempts - newAttempts;
      if (guess > targetNumber) {
        setMessage(`Too high! Try a smaller number. ${remainingAttempts} attempts remaining.`);
        guessResult.hint = 'Too high';
      } else {
        setMessage(`Too low! Try a bigger number. ${remainingAttempts} attempts remaining.`);
        guessResult.hint = 'Too low';
      }
    }

    setGuessHistory([...guessHistory, guessResult]);
    setUserGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameOver) {
      makeGuess();
    }
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const getEmoji = (hint) => {
    if (hint === 'Correct!') return '🎉';
    if (hint === 'Too high') return '⬇️';
    if (hint === 'Too low') return '⬆️';
    return '❌';
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Number Guesser Game</h1>
          <p>Can you guess the secret number? Use the hints to find it!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <div style={{ marginBottom: '20px' }}>
              <h4>Choose Difficulty:</h4>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {Object.keys(difficultySettings).map((level) => (
                  <button
                    key={level}
                    className={`btn ${difficulty === level ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDifficulty(level)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {level} ({difficultySettings[level].min}-{difficultySettings[level].max})
                  </button>
                ))}
              </div>
            </div>

            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #e9ecef',
              marginBottom: '20px'
            }}>
              <div style={{ 
                fontSize: '1.1rem',
                marginBottom: '15px',
                textAlign: 'center',
                color: gameOver ? (message.includes('Congratulations') ? '#22c55e' : '#ef4444') : '#333'
              }}>
                {message}
              </div>

              {!gameOver && (
                <div className="input-group">
                  <input
                    type="number"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your guess"
                    min={minRange}
                    max={maxRange}
                    style={{ width: '150px' }}
                  />
                  <button className="btn btn-primary" onClick={makeGuess}>
                    Guess!
                  </button>
                </div>
              )}

              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
                fontSize: '1rem',
                color: '#666'
              }}>
                <span>Attempts: {attempts}/{difficultySettings[difficulty].maxAttempts}</span>
                <span>Range: {minRange} - {maxRange}</span>
              </div>
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={startNewGame}>
                New Game
              </button>
            </div>

            {guessHistory.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h4>Guess History:</h4>
                <div style={{ 
                  background: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {guessHistory.map((guess, index) => (
                    <div key={index} style={{ 
                      padding: '8px',
                      borderBottom: index < guessHistory.length - 1 ? '1px solid #f0f0f0' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>
                        Attempt {guess.attempt}: <strong>{guess.number}</strong>
                      </span>
                      <span style={{ 
                        color: guess.hint === 'Correct!' ? '#22c55e' : '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {getEmoji(guess.hint)} {guess.hint}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>How to Play</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Choose your difficulty level (Easy, Medium, or Hard)</li>
              <li>I'll think of a random number within the range</li>
              <li>Make your guess and I'll tell you if it's too high or too low</li>
              <li>Keep guessing until you find the number or run out of attempts</li>
              <li>Try to guess in as few attempts as possible!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberGuesser;