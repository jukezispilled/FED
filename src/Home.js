"use client";

import { useState, useEffect } from 'react';
import { User, Wallet, BarChart3, Lock, Activity, Coins, Banana, Target, Zap } from "lucide-react";

export default function Home() {
  const [blinkCursor, setBlinkCursor] = useState(true);
  const [loadingDots, setLoadingDots] = useState('.');

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkCursor((prev) => !prev);
    }, 500);

    const loadingInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 md:p-6 pt-[7.5%] md:pt-[3.5%] font-mono">
      <div className='absolute top-0 left-0 w-full bg-green-500 py-1 text-xs text-center text-black'>CA: updating...</div>
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-3xl font-bold">Spy Monkey Terminal v1.0</h1>
        <div className='flex space-x-3'>
            <div className='flex items-center z-[50]'>
            <a href="https://x.com/" className='transition ease-in-out duration-150'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-7 md:size-9 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#22c55e" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                </svg>
            </a>
            <a href="https://t.me/" className='transition ease-in-out duration-150'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-7 md:size-9 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#22c55e" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                </svg>
            </a>
            </div>
            <img src="user.png" className='size-9 md:size-11 border-2 border-green-500 rounded-full object-cover' />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="col-span-1">
          <TerminalLine prompt="$" command="authenticate_agent" />
          <InfoBox
            icon={<Target className="w-4 h-4" />}
            title="Agent Authenticated: Bonobo Bond"
            content={
              <>
                <span>Clearance Level:</span>
                <div className="flex flex-wrap">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className={`w-4 h-4 border border-green-500 ${level <= 4 ? 'bg-green-500' : ''}`}></div>
                  ))}
                </div>
                <div>Level 5 Monkey Business</div>
              </>
            }
          />
        </div>

        <div className="col-span-1">
          <TerminalLine prompt="$" command="show_wallet_balance" />
          <InfoBox
            icon={<Wallet className="w-4 h-4" />}
            title="Crypto Arsenal:"
            content={
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>SOL: 1337.42</div>
                  <div>SPY: 42069.69</div>
                  <div>BANANA: 8008.5</div>
                  <div>COCONUT: 1234.56</div>
                </div>
                <div className="mt-2">Total Value: $420,420.69 USD</div>
              </>
            }
          />
        </div>

        <div className="col-span-1">
          <TerminalLine prompt="$" command="check_market_intel" />
          <InfoBox
            icon={<BarChart3 className="w-4 h-4" />}
            title="Crypto Market Intel:"
            content={
              <>
                {[
                  { label: "SOL/USD:", value: "$150.69", change: "↑5.7%", changeColor: "text-green-400" },
                  { label: "SPY/SOL:", value: "0.0069", change: "↑13.37%", changeColor: "text-green-400" },
                  { label: "BANANA/SOL:", value: "0.0042", change: "↓2.1%", changeColor: "text-red-400" },
                  { label: "COCONUT/SOL:", value: "0.0101", change: "↑8.5%", changeColor: "text-green-400" },
                ].map((market, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{market.label}</span>
                    <span>{market.value} <span className={market.changeColor}>{market.change}</span></span>
                  </div>
                ))}
                <div className="mt-2 text-yellow-400">Market Status: Positions ripening{loadingDots}</div>
              </>
            }
          />
        </div>

        <div className="col-span-1">
          <TerminalLine prompt="$" command="list_recent_ops" />
          <InfoBox
            icon={<Activity className="w-4 h-4" />}
            title="Recent Covert Operations:"
            content={
              <ul className="list-disc list-inside space-y-1">
                {[
                  "Executed stealth swap: 10 SOL → SPY launch",
                  "Deployed 500 BANANA tokens to Farm staking contract",
                  "Successfully exfiltrated with 0.5 SOL mission reward",
                  "Intercepted and decoded Degen DAO's secret governance proposal",
                ].map((operation, index) => <li key={index}>{operation}</li>)}
              </ul>
            }
          />
        </div>

        <div className="col-span-1">
          <TerminalLine prompt="$" command="show_jungle_metrics" />
          <InfoBox
            icon={<Coins className="w-4 h-4" />}
            title="Jungle DeFi Metrics:"
            content={
              <>
                {[
                  { name: "Banana Farm Yield", value: "420% APY", icon: <Banana className="w-4 h-4" /> },
                  { name: "Jungle Swap Liquidity", value: "69,420 SOL", icon: <Zap className="w-4 h-4" /> },
                  { name: "Monkey Vault TVL", value: "13,370 SOL", icon: <Lock className="w-4 h-4" /> },
                  { name: "Coconut Lending Rate", value: "6.9% APR", icon: <Coins className="w-4 h-4" /> }
                ].map((stat, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        {stat.icon}
                        {stat.name}
                      </span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="w-full bg-green-900 h-2 rounded">
                      <div className="bg-green-500 h-full" style={{ width: `${85 - index * 10}%` }}></div>
                    </div>
                  </div>
                ))}
              </>
            }
          />
        </div>

        <div className="col-span-1">
          <TerminalLine prompt="$" command="check_security_status" />
          <InfoBox
            icon={<Lock className="w-4 h-4" />}
            title="Crypto-Security Status: DEFCON 3"
            content={
              <ul className="list-none space-y-1">
                {[
                  "Quantum-resistant multisig enabled",
                  "Monitoring for suspicious activity",
                  "Warning: Potential exploit detected",
                ].map((status, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    {status}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
      </div>

      <div className={`text-lg mt-6 ${blinkCursor ? 'animate-blink' : ''}`}>
        {`> `}
        <span className="text-green-400">Type command{loadingDots}</span>
      </div>
    </div>
  );
}

function TerminalLine({ prompt, command }) {
  return (
    <div className="flex">
      <span className="text-green-500">{prompt}</span>
      <span className="text-green-400">{command}</span>
    </div>
  );
}

function InfoBox({ icon, title, content }) {
  return (
    <div className="bg-black border border-green-500 p-4 rounded-lg mt-2">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      {content}
    </div>
  );
}