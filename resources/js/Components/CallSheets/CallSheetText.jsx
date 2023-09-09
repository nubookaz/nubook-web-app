import React from 'react';

const CallSheetText = ({ isMine, className, children }) => {
  const bubbleClass = isMine ? 'mine' : 'theirs';
  const containerClasses = `${className}`;

  return (
    <div className={`imessage-bubble ${bubbleClass} ${containerClasses}`}>
      {children}
    </div>
  );
};

export default CallSheetText;
