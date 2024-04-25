import React from 'react';

function ImageContainer({ 
    
    children, 
    className, 
    backgroundImage,
    overlayOpacity = '50', 
    opacityColor,
    onClick,
    backgroundSize = 'cover',
    enableHover = false,
    childrenClass,

}) {

    const containerStyles = backgroundImage 
    ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: `${backgroundSize}`, 
    } : {};
    const staticClassNames = "overflow-hidden relative rounded-xl";
    const dynamicClassNames = className ? className : "";
    const combinedClassNames = staticClassNames + ' ' + dynamicClassNames;


    const containerClassName = `container-base image-container h-full ease-in-out ${enableHover ? 'duration-500 hover:scale-[105%]' : '' }`;
    const opacity = `w-full h-full z-10 absolute opacity-${overlayOpacity} ${opacityColor ? opacityColor : 'bg-black'}`;

    return (
        <div onClick={onClick} className={combinedClassNames}>
             <div
                loading="eager"
                rel="preload"
                className={containerClassName}
                style={{ ...containerStyles }}           
             >
                <div className={opacity}></div>
                <div className={` ${childrenClass} z-50 relative`}>{children}</div>
            </div>
        </div>
    );
}

export default ImageContainer;
