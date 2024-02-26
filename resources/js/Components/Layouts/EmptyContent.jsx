import React from 'react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

function EmptyContent({ imageUrl, children, buttonText, onClick, svgClass, className }) {

    const svgPath = imageUrl || '/undraw_default_1.svg';


    return (
        <div className={`${className} flex flex-col gap-4 items-center justify-center h-full mx-auto text-center `}>

            <h2 className='text-slate-500 font-bold text-xl'>{children.header}</h2>
            
            <div className={`my-4 max-w-[10rem] opacity-[.20] w-full ${svgClass}`}>
                <img className='w-full' src={'/images/svg_images/' + svgPath} alt="Custom Icon" />
            </div>

            <div className='text-slate-400'>
                {children.description}
            </div>

            <SecondaryButton onClick={onClick} className={`text-slate-400`}>
                {buttonText}
            </SecondaryButton>

        </div>
    );
}

export default EmptyContent;
