export const today = new Date();
export const date = today.getDate();

export const dateWithSuffix = date + (date % 10 === 1 && date !== 11
    ? 'st'
    : date % 10 === 2 && date !== 12
    ? 'nd'
    : date % 10 === 3 && date !== 13
    ? 'rd'
    : 'th'
  );
export const year = today.getFullYear();
export const month = today.toLocaleDateString('en-US', { month: 'long' });
export const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });

export const formattedDate = `${dayOfWeek}, ${month} ${dateWithSuffix} ${year}`;

