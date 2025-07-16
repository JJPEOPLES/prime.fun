import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordGenerator = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('Please select at least one character type!');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Password Generator</h1>
          <p>Create super secure passwords to keep your accounts safe!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <h3>Generate Your Password</h3>
            
            <div className="input-group">
              <label>
                Length: 
                <input 
                  type="number" 
                  value={length} 
                  onChange={(e) => setLength(Math.max(1, Math.min(50, e.target.value)))}
                  min="1"
                  max="50"
                />
              </label>
            </div>

            <div style={{ margin: '20px 0' }}>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input 
                  type="checkbox" 
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include Uppercase Letters (A-Z)
              </label>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input 
                  type="checkbox" 
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include Lowercase Letters (a-z)
              </label>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input 
                  type="checkbox" 
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers (0-9)
              </label>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input 
                  type="checkbox" 
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols (!@#$%^&*)
              </label>
            </div>

            <div className="controls">
              <button className="btn btn-primary" onClick={generatePassword}>
                Generate Password
              </button>
              {password && (
                <button className="btn btn-secondary" onClick={copyToClipboard}>
                  Copy to Clipboard
                </button>
              )}
            </div>

            {password && (
              <div className="result-display">
                <code style={{ wordBreak: 'break-all', fontSize: '1.1rem' }}>
                  {password}
                </code>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Password Security Tips</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Use a unique password for each account</li>
              <li>Make passwords at least 12 characters long</li>
              <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>Don't use personal information like names or birthdays</li>
              <li>Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;