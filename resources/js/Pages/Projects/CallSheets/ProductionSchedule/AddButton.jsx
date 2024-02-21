import React from 'react';

import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';


export default function AddButton({ addScene, addBreak, addCompanyMove, className }) {



    return (
        <div className={` ${className} flex flex-row gap-4 mx-auto justify-center`}>
            <PrimaryButton onClick={addScene} className="bg-slate-400 text-white rounded text-sm">Add Scene Row</PrimaryButton>
            <SecondaryButton onClick={addBreak} className="bg-slate-200 text-white rounded text-sm">Add Break Row</SecondaryButton>
            <SecondaryButton onClick={addCompanyMove} className="bg-slate-200 text-white rounded text-sm">Add Company Move</SecondaryButton>
        </div>        
    );
}

