import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PasswordGenerator from './components/PasswordGenerator';
import ColorPalette from './components/ColorPalette';
import TextToArt from './components/TextToArt';
import SpeedTyping from './components/SpeedTyping';
import NumberGuesser from './components/NumberGuesser';
import DrawingCanvas from './components/DrawingCanvas';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/color-palette" element={<ColorPalette />} />
          <Route path="/text-to-art" element={<TextToArt />} />
          <Route path="/speed-typing" element={<SpeedTyping />} />
          <Route path="/number-guesser" element={<NumberGuesser />} />
          <Route path="/drawing-canvas" element={<DrawingCanvas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;