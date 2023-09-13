import React, { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import Avatar from '@mui/joy/Avatar';


const thumbsContainer = {
display: 'flex',
flexDirection: 'row',
flexWrap: 'wrap',
marginTop: 16
};

const thumb = {
display: 'inline-flex',
borderRadius: 2,
border: '1px solid #eaeaea',
marginBottom: 8,
marginRight: 8,
width: 100,
height: 100,
padding: 4,
boxSizing: 'border-box'
};

const thumbInner = {
display: 'flex',
minWidth: 0,
overflow: 'hidden'
};

const img = {
display: 'block',
width: 'auto',
height: '100%'
};



function ProfilePicture({ onClick, className, isUploadable }) {
    const totalImages = 12;

    // Function to generate a random number between 1 and 12
    const generateRandomIndex = () => {
        return Math.floor(Math.random() * totalImages) + 1;
    };

    // Check if there is a stored image index, if not, generate a new one
    let storedImageIndex = localStorage.getItem('imageIndex');
    if (!storedImageIndex) {
        storedImageIndex = generateRandomIndex();
        localStorage.setItem('imageIndex', storedImageIndex);
    }

    // Set the image URL based on the stored or generated index
    const imageUrl = `/images/profile_images/profile_image_${storedImageIndex}.svg`;



    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    const imageUrls = files.map(file => file.preview);

  
    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
  
   

    // Conditional rendering based on the isUploadable prop
    if (isUploadable) {
        return (
            <div
                className={`${className} profile-photo ${imageUrls.length > 0 ? 'has-image' : ''} profile-upload-state`}
                    {...getRootProps()}
                    style={{
                    backgroundImage: `url(${imageUrls.join(', ')})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                >
                <div {...getRootProps()} className={`dropzone uploaded-state ${imageUrls.length > 0 ? 'has-image' : ''}`}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className={className} onClick={onClick}>
                {/* Avatar component */}
                <Avatar size="lg" alt="Remy Sharp" src={imageUrl} />
            </div>
        );
    }
}

export default ProfilePicture;
