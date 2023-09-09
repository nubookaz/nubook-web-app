import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function ProfilePicture({ alt, width, height, onClick, isUploadable }) {
    const defaultImagePathFormat = '/images/profile_images/profile_image_%d.svg';
    const totalImages = 12;

    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const calculateImageIndex = () => {
        const dayOfWeek = new Date().getDay();
        return (dayOfWeek % totalImages) + 1;
    };

    useEffect(() => {
        if (!isUploadable) {
            setCurrentImageIndex(calculateImageIndex());
        }
    }, [isUploadable]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target.result;
                setUploadedImage(imageSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    const containerStyle = {
        backgroundImage: uploadedImage ? `url(${uploadedImage})` : isUploadable ? 'url(/images/user_uploaded_image.png)' : currentImageIndex !== null ? `url(${defaultImagePathFormat.replace('%d', currentImageIndex)})` : 'none',
        backgroundSize: 'cover',
        width: width + 'px',
        height: height + 'px',
        cursor: uploadedImage ? 'default' : isUploadable ? 'pointer' : 'default',
    };

    return (
        <div
            className={`profile-picture-container ${uploadedImage ? '' : (isUploadable ? 'profile-upload-state' : '')}`}
            style={containerStyle}
            onClick={onClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {isUploadable && !uploadedImage && ( // Hide the centered content if not uploadable and no image is uploaded
                <div className="centered-content">
                    <FontAwesomeIcon icon={faImage} />
                    <p>Drag and drop your profile photo here</p>
                </div>
            )}
        </div>
    );
}

export default ProfilePicture;
