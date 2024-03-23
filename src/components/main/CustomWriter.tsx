"use client";
import React, { useState, useEffect } from "react";

interface CustomTypewriterProps {
  text: string;
  speed: number;
  children: React.ReactNode;
}

const CustomTypewriter: React.FC<CustomTypewriterProps> = ({
  text,
  speed,
  children,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [idx, setIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (idx < text.length) {
        setDisplayText(displayText + text[idx]);
        setIdx(idx + 1);
      } else {
        setIsFinished(true);
      }
    }, speed);

    return () => {
      clearTimeout(timer);
    };
  }, [displayText, idx, text, speed, isFinished]);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: displayText }} />
      {isFinished && children}
    </>
  );
};

export default CustomTypewriter;
