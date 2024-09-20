import React, { useState, useEffect } from 'react';
import TypingAnimation from './typing-animation';
import Home from './Home';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [navigate, setNavigate] = useState(false); // Add state to navigate to the new component

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setShowAccessGranted(true);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(scanInterval);
  }, []);

  // Navigate to new component after 2 seconds of showing "ACCESS GRANTED"
  useEffect(() => {
    if (showAccessGranted) {
      const timeout = setTimeout(() => {
        setNavigate(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showAccessGranted]);

  // If navigate is true, render the new component
  if (navigate) {
    return <Home />;
  }

  return (
    <div className="h-screen w-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <div className="absolute bottom-5 right-5 p-2 text-right">
        <div className="text-xl mb-2">
          <TypingAnimation className="text-xl text-right" text={`TIME: ${currentTime}`} duration={120} />
        </div>
        <div className="text-xl mb-2">
          <TypingAnimation className="text-xl text-right" text={`DATE: ${currentDate}`} duration={120} />
        </div>
        <div className="text-xl">
          <TypingAnimation className="text-xl text-right" text="LOCATION: [SOLANA]" duration={120} />
        </div>
      </div>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <img src="spy.png" alt="Spy" className="w-full h-full object-cover" />
        <div 
          className="absolute top-0 left-0 w-full bg-red-500 opacity-30 transition-all duration-100" 
          style={{ height: `${scanProgress}%` }}
        />
        <div className="absolute top-0 left-0 w-full text-center py-2 font-semibold">
          Scanning: {scanProgress}%
        </div>
        {showAccessGranted && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-green-500 text-center font-bold z-20">
            ACCESS GRANTED
          </div>
        )}
      </div>
    </div>
  );
}

export default App;