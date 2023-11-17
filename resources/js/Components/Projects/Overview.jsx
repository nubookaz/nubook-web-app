import { usePage } from '@inertiajs/react';

import MultiCircularProgress from '@/Components/ProgressBars/MultiCircularProgress';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';




export default function Overview({
    projects,
    isPortrait,
    onClick,
    multiCircularProgressSize,
}) {
    const { props } = usePage();

    const estimateProjects = props.projects.filter(project => project.project_stage === 'Estimate');
    const creativeDevelopmentProjects = props.projects.filter(project => project.project_stage === 'Creative Development');
    const preProductionProjects = props.projects.filter(project => project.project_stage === 'Pre-Production');
    const productionProjects = props.projects.filter(project => project.project_stage === 'Production');
    const postProductionProjects = props.projects.filter(project => project.project_stage === 'Post-Production');
    const completedProjects = props.projects.filter(project => project.project_stage === 'Completed');

    const buttonText = "Start a New Project"; // Provide the button text

    return (

    <div className='h-full flex w-full'>
        <div className={`flex w-full h-full text-center ${isPortrait ? 'flex-col justify-between' : 'flex-row'}`}>
            <div className={`  ${isPortrait ? 'mx-auto mt-[3rem]' : 'my-auto w-1/2'}`}>
                <MultiCircularProgress 
                    projects={projects}
                    estimateProjects={estimateProjects}
                    creativeDevelopmentProjects={creativeDevelopmentProjects}
                    preProductionProjects={preProductionProjects}
                    productionProjects={productionProjects}
                    postProductionProjects={postProductionProjects}
                    completedProjects={completedProjects}
                    multiCircularProgressSize={multiCircularProgressSize}                    
                />
            </div>
            <div className={` ${isPortrait ? 'w-full h-full my-[2rem]' : 'w-1/2'  } `}>
                <div className={`grid grid-row-3 h-full border-slate-50 ${isPortrait ? 'w-full border--2 ' : 'border-l-2 '}`}>
                    <div className='grid grid-cols-2 w-full border-slate-50  border-b-2'>
                        <div className='flex bg-[#fcfcfc] border-r-2 border-slate-50'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{estimateProjects.length}</span>
                                <p className='mt-2 text-sm'>Estimate</p>
                            </div>
                        </div>
                        <div className='flex bg-[#fcfcfc]'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{creativeDevelopmentProjects.length}</span>
                                <p className='mt-2 text-sm'>Creative Development</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 w-full border-slate-50  border-b-2'>
                        <div className='flex  bg-[#fcfcfc] border-r-2 border-slate-50'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{preProductionProjects.length}</span>
                                <p className='mt-2 text-sm'>Pre-Production</p>
                            </div>
                        </div>
                        <div className='flex bg-[#fcfcfc]'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{productionProjects.length}</span>
                                <p className='mt-2 text-sm'>Production</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 w-full border-slate-50  border-b-2'>
                        <div className='flex bg-[#fcfcfc] border-r-2 border-slate-50'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{postProductionProjects.length}</span>
                                <p className='mt-2 text-sm'>Post-Production</p>
                            </div>
                        </div>
                        <div className='flex bg-[#fcfcfc]'>
                            <div className='m-auto'>
                                <span className='text-2xl font-bold'>{completedProjects.length}</span>
                                <p className='mt-2 text-sm'>Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
            {isPortrait && (
                <div className='justify-end mb-8 w-3/4 mx-auto'>
                    <SecondaryButton href={route('projects.index')}>
                        View Projects
                    </SecondaryButton>
                </div>
            )}


        </div>
    </div>

    );

}