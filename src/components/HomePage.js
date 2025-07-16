import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Password Generator',
      description: 'Generate super secure passwords with custom options. Perfect for keeping your accounts safe!',
      path: '/password-generator',
      status: 'available'
    },
    {
      title: 'Color Palette Generator',
      description: 'Create beautiful color schemes for your projects. Click to generate random palettes!',
      path: '/color-palette',
      status: 'available'
    },
    {
      title: 'Text to ASCII Art',
      description: 'Turn your text into cool ASCII art. Make your messages look awesome!',
      path: '/text-to-art',
      status: 'available'
    },
    {
      title: 'Speed Typing Test',
      description: 'Test how fast you can type! Challenge yourself and improve your typing skills.',
      path: '/speed-typing',
      status: 'available'
    },
    {
      title: 'Number Guesser Game',
      description: 'Can you guess the number? A fun guessing game with hints to help you win!',
      path: '/number-guesser',
      status: 'available'
    },
    {
      title: 'Drawing Canvas',
      description: 'Create digital art with this simple drawing tool. Perfect for doodling!',
      path: '/drawing-canvas',
      status: 'available'
    },
    {
      title: 'Random Quote Generator',
      description: 'Get inspired with random quotes from famous people and thinkers.',
      path: '/quotes',
      status: 'coming-soon'
    },
    {
      title: 'Weather Dashboard',
      description: 'Check the weather in any city around the world with this cool weather app.',
      path: '/weather',
      status: 'coming-soon'
    },
    {
      title: 'Pixel Art Maker',
      description: 'Create pixel art masterpieces with this easy-to-use pixel editor.',
      path: '/pixel-art',
      status: 'coming-soon'
    }
  ];

  const handleProjectClick = (project) => {
    if (project.status === 'available') {
      navigate(project.path);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>prime.fun</h1>
          <p className="tagline">A playground for weird ideas, made by the smartest dumbo on Earth.</p>
          <p className="creator-info">Made with ❤️ by an 11-year-old who loves to code!</p>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <h2>Interactive Projects</h2>
          <p>Click on any project to explore! Some are still being built by our youngest developer.</p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-card ${project.status === 'coming-soon' ? 'disabled' : ''}`}
                onClick={() => handleProjectClick(project)}
                style={{ 
                  cursor: project.status === 'coming-soon' ? 'not-allowed' : 'pointer',
                  opacity: project.status === 'coming-soon' ? 0.7 : 1
                }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className={`status ${project.status}`}>
                  {project.status === 'available' ? 'Ready to play!' : 'Coming soon...'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;