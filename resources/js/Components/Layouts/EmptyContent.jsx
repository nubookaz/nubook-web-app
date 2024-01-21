import React from 'react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

function EmptyContent({ imageUrl, children, buttonText, onClick, svgClass, className }) {

    const svgPath = imageUrl || '/undraw_default_1.svg';


    return (
        <div className={`${className} flex flex-col gap-4 items-center justify-center h-full mx-auto text-center `}>

            {children.header}
            
            <div className={`my-4 max-w-[15rem] opacity-[.15] w-full ${svgClass}`}>
                <img className='w-full' src={svgPath} alt="Custom Icon" />
            </div>

            <div>
                {children.description}
            </div>

            <SecondaryButton onClick={onClick} >
                {buttonText}
            </SecondaryButton>

        </div>
    );
}

export default EmptyContent;
