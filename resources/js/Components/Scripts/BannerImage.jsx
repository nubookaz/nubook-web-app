
  // Define the default image path format
  const defaultImagePathFormat = '/images/background_images/bg_image_%d.jpg';

  // Define the total number of default images
  const totalImages = 16;

  // Function to calculate the image index based on the current day of the week
  const calculateImageIndex = () => {
    const dayOfWeek = new Date().getDay();
    return (dayOfWeek % totalImages) + 1;
  };

  // Use the current day to set the initial image index
  const initialImageIndex = calculateImageIndex();

  // Construct the image URL
  export const imageUrl = defaultImagePathFormat.replace('%d', initialImageIndex);

