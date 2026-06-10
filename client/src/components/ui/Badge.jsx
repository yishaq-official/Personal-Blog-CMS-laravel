import React from 'react';

const Badge = ({ color = 'neutral', label, className = '' }) => {
  const colorClass = `badge-${color}`;
  
  return (
    <span className={`badge ${colorClass} ${className}`}>
      {label}
    </span>
  );
};

export default Badge;
