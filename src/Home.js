'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const initialOutput = [
    'Welcome, Agent. Initializing secure terminal...',
    'Remember: Maintain your cover at all times.',
    'Type "help" for available commands.',
  ];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]); // All terminal output, starting empty
  const [displayedOutput, setDisplayedOutput] = useState([]); // What is currently shown on the screen
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Typing speed in milliseconds
  const typingSpeed = 25;

  // Simulate typing of each line
  const typeLine = (line) => {
    return new Promise((resolve) => {
      let currentText = '';
      let i = 0;

      const interval = setInterval(() => {
        currentText += line[i];
        setDisplayedOutput((prev) => {
          const newOutput = [...prev];
          newOutput[newOutput.length - 1] = currentText; // Update the current line being typed
          return newOutput;
        });

        i++;
        if (i === line.length) {
          clearInterval(interval);
          resolve();
        }
      }, typingSpeed);
    });
  };

  // Type all lines sequentially
  const typeAllLines = async (lines) => {
    for (let i = displayedOutput.length; i < lines.length; i++) {
      setDisplayedOutput((prev) => [...prev, '']); // Add a blank line to start typing into
      await typeLine(lines[i]);
    }
    setIsTyping(false);
  };

  // Handle typing the initial introduction once
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      setOutput(initialOutput); // Add initial output to state
    }
  }, [initialized]);

  // Handle typing out any new lines when the output changes
  useEffect(() => {
    if (output.length > displayedOutput.length && !isTyping) {
      setIsTyping(true);
      typeAllLines(output); // Type the new lines
    }
  }, [output, displayedOutput, isTyping]);

  // Handle user commands
  const handleCommand = (cmd) => {
    setOutput((prev) => [...prev, `> ${cmd}`]);

    switch (cmd.toLowerCase()) {
      case 'help':
        setOutput((prev) => [
          ...prev,
          'Available commands: status, ca, portfolio, contacts, mission, twitter, telegram, clear',
        ]);
        break;
      case 'status':
        setOutput((prev) => [
          ...prev,
          'Cover status: Maintained',
          'Suspicion level: Low',
          'Crypto knowledge: Intermediate',
        ]);
        break;
      case 'ca':
        setOutput((prev) => [
          ...prev,
          '93593rQwwqMmskArhg8owC5hUn6JTzCMhihVGshCpump',
        ]);
        break;
      case 'portfolio':
        setOutput((prev) => [
          ...prev,
          'BTC: 2.5',
          'SOL: 30.0',
          'DOGE: 10000',
          '(Values are simulated for cover maintenance)',
        ]);
        break;
      case 'contacts':
        setOutput((prev) => [
          ...prev,
          'Murad - Potential target',
          'Ansem - Informant',
          'Bastille - Suspect',
        ]);
        break;
      case 'mission':
        setOutput((prev) => [
          ...prev,
          'Current objective: Infiltrate the retardios',
          'Gather intel on potential fraud',
          'Acquire Mitch as informant',
        ]);
        break;
      case 'clear':
        setDisplayedOutput([]); // Clear displayed output
        setOutput([]); // Clear all command history
        break;
      case 'twitter':
        setOutput((prev) => [
          ...prev,
          'Visit my Twitter: [Twitter Profile](https://x.com/solFEDtoken)',
        ]);
        break;
      case 'telegram':
        setOutput((prev) => [
          ...prev,
          'Join my Telegram: [Telegram Channel](https://t.me/solFEDportal)',
        ]);
        break;
      default:
        setOutput((prev) => [
          ...prev,
          'Command not recognized. Type "help" for available commands.',
        ]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-cyan-400 p-4 font-mono md:flex-row">
      <div className="w-full md:w-1/4 border-b md:border-r border-cyan-500 pr-4 md:pr-0 md:pb-0 md:mb-0 mb-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-2 rounded-full flex items-center justify-center bg-white overflow-visible">
            <img src="fed.png" className='rounded-full' />
          </div>
          <h2 className="text-xl font-bold text-center">Agent InnocentCryptoWaifuGirl</h2>
          <p className="text-sm text-cyan-500">Undercover Operative</p>
        </div>
        <div className="space-y-2 pb-4">
          <p>Cover: Crypto Influencer</p>
          <p>Followers: 50.2K</p>
          <p>Location: Encrypted</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 md:px-4 overflow-auto">
          {displayedOutput.map((line, index) => (
            <p key={index} className="mb-1">
              {line.includes('http') ? <a href={line.split('](')[1].slice(0, -1)} className="text-cyan-400 underline">{line.split('](')[0].slice(1)}</a> : line}
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border border-cyan-500 text-cyan-400 p-2 outline-none"
            placeholder="Enter command..."
          />
          <button
            type="submit"
            className="ml-2 border border-cyan-500 text-cyan-400 p-2"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
}