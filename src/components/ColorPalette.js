import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ColorPalette = () => {
  const navigate = useNavigate();
  const [palette, setPalette] = useState([]);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const newPalette = [];
    for (let i = 0; i < 5; i++) {
      newPalette.push(generateRandomColor());
    }
    setPalette(newPalette);
  };

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Color ${color} copied to clipboard!`);
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Color Palette Generator</h1>
          <p>Create beautiful color schemes for your projects!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <h3>Generate Your Palette</h3>
            
            <div className="controls">
              <button className="btn btn-primary" onClick={generatePalette}>
                Generate New Palette
              </button>
            </div>

            {palette.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  {palette.map((color, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: color,
                        height: '150px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        border: '2px solid #e9ecef'
                      }}
                      onClick={() => copyColor(color)}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <div style={{ 
                        color: getContrastColor(color),
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        textAlign: 'center'
                      }}>
                        {color.toUpperCase()}
                      </div>
                      <div style={{ 
                        color: getContrastColor(color),
                        fontSize: '0.9rem',
                        marginTop: '5px'
                      }}>
                        Click to copy
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {palette.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                Click "Generate New Palette" to create your first color scheme!
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Color Theory Tips</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Use complementary colors (opposite on color wheel) for high contrast</li>
              <li>Analogous colors (next to each other) create harmony</li>
              <li>The 60-30-10 rule: 60% primary, 30% secondary, 10% accent</li>
              <li>Consider accessibility - ensure good contrast for text</li>
              <li>Test your palette in different lighting conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;