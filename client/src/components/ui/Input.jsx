import React from 'react';

const Input = React.forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium opacity-90">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
            <Icon size={16} />
          </div>
        )}
        <input
          ref={ref}
          className={`input-base ${Icon ? 'pl-9' : ''} ${error ? '!border-danger' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-danger mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
