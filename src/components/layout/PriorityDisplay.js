import React from 'react';

const PriorityDisplay = () => {
  const priorityColor = ['orange', 'blue', 'yellow'];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div></div>
      <div
        style={{
          display: 'flex'
        }}
      >
        {Array.from(Array(3), (e, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: priorityColor[i],
                display: 'inline-block',
                border: '0px',
                padding: '0.2rem 0.7rem 0.2rem 0.7rem',
                margin: '0.1rem 0.2rem 0.1rem 0.2rem'
              }}
            >
              {i + 1}
              &nbsp;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriorityDisplay;
