import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Home from './Home';

const TypingAnimation = ({ text, duration }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(intervalId);
    }, duration / text.length);

    return () => clearInterval(intervalId);
  }, [text, duration]);

  return <span>{displayText}</span>;
};

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [navigate, setNavigate] = useState(false);

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
    }, 30);

    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    if (showAccessGranted) {
      const timeout = setTimeout(() => {
        setNavigate(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [showAccessGranted]);

  if (navigate) {
    return <Home />;
  }

  return (
    <div className="h-screen w-screen bg-black text-cyan-400 font-mono flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* HUD elements */}
      <div className="absolute top-5 left-5 p-2 text-left">
        <div className="text-xl mb-2">
          TIME: {currentTime}
        </div>
        <div className="text-xl mb-2">
          DATE: {currentDate}
        </div>
        <div className="text-xl">
          LOCATION: PUMP.FUN
        </div>
      </div>

      {/* Main verification interface */}
      <motion.div
        className="relative w-96 h-96 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute w-full h-full border-4 border-cyan-500 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute w-5/6 h-5/6 border-2 border-cyan-400 rounded-full opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Scan effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-transparent opacity-50 rounded-full"
          style={{ clipPath: `inset(${100 - scanProgress}% 0 0 0)` }}
          transition={{ duration: 0.1 }}
        />

        {/* User image */}
        <div className="relative w-64 h-64 rounded-full overflow-hidden">
          <img src="fed.png" alt="Spy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-cyan-900 opacity-50" />
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full text-center py-2 font-semibold text-lg">
          Verifying: {scanProgress}%
        </div>
      </motion.div>

      {/* Additional HUD elements */}
      <div className="absolute bottom-5 right-5 p-2 text-right">
        <motion.div
          className="text-xl mb-2 flex items-center justify-end"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="mr-2">SYSTEM READY</span>
          <ChevronRight />
        </motion.div>
        <div className="text-xl">
          <TypingAnimation text="CLEARANCE: TOP SECRET" duration={120} />
        </div>
      </div>
    </div>
  );
};

export default App;