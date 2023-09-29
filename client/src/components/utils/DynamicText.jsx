import React from 'react';

const DynamicText = () => {
  const data = ['C', 'C++', 'JavaScript', 'Nodejs'];
  return (
    <>
      {data.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </>
  );
};

export default DynamicText;
