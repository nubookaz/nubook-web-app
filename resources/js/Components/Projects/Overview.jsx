import { usePage } from '@inertiajs/react';

import MultiCircularProgress from '@/Components/ProgressBars/MultiCircularProgress';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';




export default function Overview({
    projects,
    isPortrait,
    onClick,
}) {
    const { props } = usePage();

    const estimateProjects = props.projects.filter(project => project.projectStage === 'Estimate');
    const creativeDevelopmentProjects = props.projects.filter(project => project.projectStage === 'Creative Development');
    const preProductionProjects = props.projects.filter(project => project.projectStage === 'Pre-Production');
    const productionProjects = props.projects.filter(project => project.projectStage === 'Production');
    const postProductionProjects = props.projects.filter(project => project.projectStage === 'Post-Production');
    const completedProjects = props.projects.filter(project => project.projectStage === 'Completed');

    const buttonText = "Start a New Project"; // Provide the button text

    return (

    <div className='h-full'>
        <div className={`flex gap-4 w-full h-full text-center ${isPortrait ? 'flex-col justify-between' : 'flex-row'}`}>
            <div className={`  ${isPortrait ? 'mx-auto mt-[3rem]' : 'my-auto w-1/2'}`}>
                <MultiCircularProgress 
                    projects={projects}
                    estimateProjects={estimateProjects}
                    creativeDevelopmentProjects={creativeDevelopmentProjects}
                    preProductionProjects={preProductionProjects}
                    productionProjects={productionProjects}
                    postProductionProjects={postProductionProjects}
                    completedProjects={completedProjects}
                />
            </div>
            <div className={`flex flex-col flex-wrap gap-4 m-auto ${isPortrait ? 'w-full' : 'w-1/2'}`}>
                <div className={`grid grid-cols-2 gap-4 w-full ${isPortrait ? 'mb-4' : ''}`}>
                    <div>
                        <span className='text-2xl'>{estimateProjects.length}</span>
                        <h4 className='mt-4'>Estimate</h4>
                    </div>
                    <div>
                        <span className='text-2xl'>{creativeDevelopmentProjects.length}</span>
                        <h4 className='mt-4'>Creative Development</h4>
                    </div>
                </div>
                <div className={`grid grid-cols-2 gap-4 w-full ${isPortrait ? 'mb-4' : ''}`}>
                    <div>
                        <span className='text-2xl'>{preProductionProjects.length}</span>
                        <h4 className='mt-4'>Pre-Production</h4>
                    </div>
                    <div>
                        <span className='text-2xl'>{productionProjects.length}</span>
                        <h4 className='mt-4'>Production</h4>
                    </div>
                </div>
                <div className={`grid grid-cols-2 gap-4 w-full ${isPortrait ? 'mb-4' : ''}`}>
                    <div>
                        <span className='text-2xl'>{postProductionProjects.length}</span>
                        <h4 className='mt-4'>Post-Production</h4>
                    </div>
                    <div>
                        <span className='text-2xl'>{completedProjects.length}</span>
                        <h4 className='mt-4'>Completed</h4>
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