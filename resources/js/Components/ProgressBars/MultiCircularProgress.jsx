import React, { useState, useEffect } from 'react';

function MultiCircularProgress({ radius, strokeWidth, data, colors }) {
  const circumference = 2 * Math.PI * radius;

  const calculateDashArray = (percentage) => {
    const value = (percentage / 100) * circumference;
    return `${value} ${circumference - value}`;
  };

  const calculateDashOffset = (index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (data[i] / 100) * circumference;
    }
    return offset;
  };

  return (
    <svg className="multi-circular-progress" width={radius * 2} height={radius * 2}>
      {data.map((percentage, index) => {
        const dashArray = calculateDashArray(percentage);
        const dashOffset = calculateDashOffset(index);

        const color = colors[index % colors.length];

        return (
          <circle
            key={index}
            className="progress-circle"
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            stroke={color}
            fill="transparent"
            strokeLinecap="square" // Set to square
          />
        );
      })}
    </svg>
  );
}

export default MultiCircularProgress;
