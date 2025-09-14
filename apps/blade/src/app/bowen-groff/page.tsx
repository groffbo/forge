"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';

import Window from './_components/window';

import './globals.css';
import localFont from "next/font/local";
import startButtonIcon from './assets/start-button.png';
import recycleIcon from './assets/recycle.ico';
import computerIcon from './assets/computer.ico';
import textFileIcon from './assets/textfile.ico';
import photo from './assets/me.jpg';
import crunch from './assets/crunchcat.gif';
import resume from './assets/bowen-groff-resume.png';
import github from './assets/github.ico';
import linkedin from './assets/linkedin.ico'

interface AppWindow { id: string; 
                      title: string; 
                      isOpen: boolean; 
                      startX?: number;
                      startY?: number;
                    }

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
const [windows, setWindows] = useState<AppWindow[]>([
  { id: "welcome", title: "Hello World", isOpen: true },
  { id: "resume", title: "Resume.txt", isOpen: false },
]);

const toggleWindow = (id: string) => {
  setWindows(prev => prev.map(w => (w.id === id ? { ...w, isOpen: !w.isOpen} : w))
  );
};

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
        <button className="icon" onClick={() => toggleWindow("resume")}><img src={textFileIcon.src}></img>
          Resume.txt
        </button>
        <button className="icon"
          onClick={() => window.open("https://github.com/groffbo", "_blank")}
          ><img src={github.src}></img>
          GitHub
        </button>
        <button className="icon"
          onClick={() => window.open("https://www.linkedin.com/in/bowengroff/", "_blank")}
        ><img src={linkedin.src}></img>
          Linkedin
        </button>
      </div>
      <div className="convex taskbar">
        <button className="icon"><img className="startbutton" src={startButtonIcon.src}></img>
        </button>
        <div className="spacer">
          {windows.map(w => (
              <button 
                key={w.id} 
                className="convex tab" 
                onClick={() => toggleWindow(w.id)}
              >
                {w.title}
              </button>
            ))}
        </div>
        <div className="concave clock">{Clock()}</div>
      </div>
    </div>
    {windows.map(w =>
      w.isOpen ? (
        <Window 
          key={w.id}
          title={w.title}
          startX={20 + Math.random() * 100}
          startY={50 + Math.random() * 50}
          onClose={() => toggleWindow(w.id)}>
            {w.id === "welcome" ? (
              <>
                <div className="flex gap-4">
                  <img className="convex image" src={photo.src}/>
                  <span className="text mt-8">
                    My name is Bowen Groff. This is my second year at UCF.
                    I am a Computer Engineering student with an interest in anything tech. 
                    I have worked on...
                    <ul className="list-disc pl-6 ">
                      <li>Kernel Module/Driver Development</li>
                      <li>Full Stack web dev w/ ReactJS</li>
                      <li>AI/ML with Python using Pytorch and Tensorflow</li>
                      <li>...Plenty more with more to come!</li>
                    </ul>
                    <img className="h-12" src={crunch.src}></img>
                    <div className="absolute ml-5 left-0 bottom-0">
                      Try double clicking stuff! And feel free to close this window :-) (you can reopen with taskbar)
                    </div>
                  </span>
                </div>
              </>
            ) : w.id === "resume" ? (
              <img src={resume.src}></img>
            ) : (
              <p></p>
            )}
        </Window>
      ) : null
    )}
  </div>
  );
}

export default Page;