import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DrawingCanvas = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const colors = [
    '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
    '#ff00ff', '#00ffff', '#ffa500', '#800080', '#ffc0cb'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'prime-fun-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const fillCanvas = (color) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="project-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>
      
      <div className="project-header">
        <div className="container">
          <h1>Drawing Canvas</h1>
          <p>Create digital art with this simple drawing tool!</p>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <div className="interactive-area">
            <div style={{ marginBottom: '20px' }}>
              <h4>Drawing Tools</h4>
              
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '15px'
              }}>
                <div>
                  <label style={{ marginRight: '10px' }}>Color:</label>
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px' }}
                  />
                </div>
                
                <div>
                  <label style={{ marginRight: '10px' }}>Brush Size:</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(e.target.value)}
                  />
                  <span style={{ marginLeft: '10px' }}>{brushSize}px</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ marginRight: '10px' }}>Quick Colors:</label>
                {colors.map((color) => (
                  <button
                    key={color}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: color,
                      border: currentColor === color ? '3px solid #333' : '2px solid #ccc',
                      borderRadius: '50%',
                      margin: '0 5px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setCurrentColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ 
                  cursor: 'crosshair',
                  touchAction: 'none',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>

            <div className="controls" style={{ marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={clearCanvas}>
                Clear Canvas
              </button>
              <button className="btn btn-primary" onClick={downloadCanvas}>
                Download Drawing
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => fillCanvas('#ffffff')}
              >
                White Fill
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => fillCanvas('#000000')}
              >
                Black Fill
              </button>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Drawing Tips</h3>
            <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Use smaller brush sizes for detailed work</li>
              <li>Try different colors to make your art more vibrant</li>
              <li>Click and drag to draw smooth lines</li>
              <li>Use the clear button to start over</li>
              <li>Download your artwork when you're done!</li>
              <li>Experiment with different brush sizes for various effects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;