import React, { useState } from 'react';

function ToggleSwitch({ onChange, checked, className }) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className={`toggle-switch ${className || ''}`}>
      <input
        type="checkbox"
        className="toggle-checkbox"
        checked={isChecked}
        onChange={toggle}
      />
      <div className={`toggle-slider ${isChecked ? 'checked' : ''}`} />
    </label>
  );
}

export default ToggleSwitch;
