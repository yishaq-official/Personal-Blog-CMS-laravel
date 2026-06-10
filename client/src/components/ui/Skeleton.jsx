import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', ...props }) => {
  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-800 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
