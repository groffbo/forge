"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';

import './globals.css';
import localFont from "next/font/local";
import startButtonIcon from './assets/start-button.png';
import recycleIcon from './assets/recycle.ico';
import computerIcon from './assets/computer.ico';

const windows95 = localFont({
  src: './assets/Windows Regular.ttf',
  display: "swap",
  fallback: ["Tahoma", "sans-serif"],
})

const Clock = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = useCallback(() => {
        setDate(new Date());
    }, []);

    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
    const timeString = useMemo(() => date.toLocaleTimeString("en-GB", options), [date]);

    return <span>{timeString}</span>;
};

function Page() {

return (
  <div className={`${windows95.className}`}>
    <div className="w-screen h-screen bg-[#008080] flex flex-wrap content-start p-4 gap-8">
      <div className="icon-column">
        <button className="icon"><img src={computerIcon.src}></img>
          My Computer
        </button>
        <button className="icon"><img src={recycleIcon.src}></img>
          Recycle Bin
        </button>
      </div>
      <div className="convex taskbar">
        <button className="icon"><img className="startbutton" src={startButtonIcon.src}></img></button>
        <div className="spacer"></div>
        <div className="concave clock">{Clock()}</div>
      </div>
    </div>
  </div>
  );
}

export default Page;