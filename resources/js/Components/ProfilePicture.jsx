import React, { useEffect, useState } from 'react';

function ProfilePicture({ alt, width, height, onClick }) {
    // Define the default image path format
    const defaultImagePathFormat = '/images/profile_images/profile_image_%d.svg';

    // Define the total number of default images
    const totalImages = 12;

    // Initialize a state variable to track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(1);

    // Function to calculate the image index based on the current day of the week
    const calculateImageIndex = () => {
        const dayOfWeek = new Date().getDay();
        return (dayOfWeek % totalImages) + 1;
    };

    // Use the current day to set the initial image index
    useEffect(() => {
        setCurrentImageIndex(calculateImageIndex());
    }, []);

    return (
        <img
            src={defaultImagePathFormat.replace('%d', currentImageIndex)}
            alt={alt}
            width={width}
            height={height}
            className="rounded-full profile-picture"
            onClick={onClick} // Pass the onClick handler to allow interaction
        />
    );
}

export default ProfilePicture;
