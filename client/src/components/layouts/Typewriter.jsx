// Typewriter.js
import React, { useState, useEffect } from 'react';

const Typewriter = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < texts[currentTextIndex].length) {
        setDisplayText((prevText) => prevText + texts[currentTextIndex][currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }

      if (currentIndex === texts[currentTextIndex].length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setCurrentIndex(0);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setDisplayText('');
        }, 500);
      }
    }, 100); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [texts, currentTextIndex, currentIndex]);

  return <span className="text-2xl font-bold text-gray-600">{displayText}</span>;
};

export default Typewriter;
