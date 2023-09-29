import React, { useState, useEffect } from 'react';
import './typewriter.css';
import DynamicText from './DynamicText';

const Typewriter = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const text = <DynamicText />;

      if (currentIndex === text.props.children.length) {
        clearInterval(intervalId);
        return;
      }

      setCurrentText(text.props.children[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }, 100);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="typewriter">
      {currentText}
      <span className="cursor" />
    </div>
  );
};

export default Typewriter;
