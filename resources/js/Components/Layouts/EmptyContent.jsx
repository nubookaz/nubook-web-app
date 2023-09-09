import React from 'react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

function EmptyContent({ customSvgPath, children, buttonText,onButtonClick }) {

    const svgPath = customSvgPath || '/undraw_default_1.svg';

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-[35rem] mx-auto text-center">

            {children}

            <div className="my-8 mb-16 w-[32rem] opacity-25">
                <img src={svgPath} alt="Custom Icon" />
            </div>
            <SecondaryButton onClick={onButtonClick}>
                {buttonText}
            </SecondaryButton>
        </div>
    );
}

export default EmptyContent;
