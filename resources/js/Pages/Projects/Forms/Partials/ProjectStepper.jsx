import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';


import {  faGamepad, faInfoCircle, faSitemap, faCheck, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons'; 



const ProjectStepper = ({ 

    currentStep,
    activeProject
 
}) => {

    const steps = [
        { icon: faSitemap, label: 'Project Type' },
        { icon: faInfoCircle, label: activeProject + ' Type' },
        { icon: faMagnifyingGlass, label: 'Project Details' },
        { icon: faGamepad, label: 'Step 4' },
     ];
 
    return (
        <div className='w-full max-w-[56rem] mx-auto'>
            <Stepper
                size="lg"
                sx={{
                    width: '100%',
                    '--StepIndicator-size': '2rem',
                    '--Step-connectorInset': '10px',
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderWidth: 2,
                        borderColor: '#f6f4f1',
                     },
                    [`& .${stepClasses.root}::after`]: {
                        height: 2,

                    },
                    [`& .${stepClasses.completed}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderColor: '#f6f4f1',
                        color: 'primary.100',
                        bgcolor: 'primary.300',
                    },
                    '&::after': {
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'primary.300',
                        bgcolor: 'transparent',
                        padding: '0',
                     },
                    },
                    [`& .${stepClasses.active}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        borderColor: 'currentColor',
                        
                    },
                    },
                    [`& .${stepClasses.disabled} *`]: {
                        color: 'primary.100',
                    },
                    [`& .${stepClasses.disabled}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                            borderColor: 'primary.100',
                            color: 'primary.300',
                            
                    },
                    '&::after': {
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        borderColor: 'primary.100',
                        bgcolor: 'transparent',
                        padding: '0',
                        color: 'primary.100',
                     },
                    },
                }}
            >
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        completed={index < currentStep}
                        active={index === currentStep}
                        disabled={index > currentStep}
                        orientation="vertical"
                        indicator={
                            <StepIndicator variant={index === currentStep ? "solid" : "outlined"} color={index === currentStep ? "primary" : "neutral"}>
                                <FontAwesomeIcon className='text-[.75rem]' icon={index < currentStep ? faCheck : step.icon} />
                            </StepIndicator>
                        }
                    >
                        {index === currentStep && (
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'lg',
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.5px',
                                }}                           
                            >
                                {step.label}
                            </Typography>
                        )}
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default ProjectStepper;