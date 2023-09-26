import React from 'react';

function CardLayout({ colSpans, withRows, children }) {
  const totalRows = withRows.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);

  return (
    <div className={`grid grid-cols-4 gap-4 h-full w-full`}>
      {colSpans.map((colSpan, index) => (
        colSpan > 0 && (
          <div
            key={`column-${index + 1}`}
            className={`col-span-${colSpan}`}
          >
            {React.Children.map(children[`column${index + 1}`], (child) => (
              React.cloneElement(child, {
                className: withRows[index] ? `grid grid-rows-${totalRows} gap-4 h-full` : 'h-full flex',
              })
            ))}
          </div>
        )
      ))}
    </div>
  );
}

export default CardLayout;
