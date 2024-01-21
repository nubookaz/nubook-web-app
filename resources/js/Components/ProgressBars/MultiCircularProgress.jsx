import React, { useState, useEffect } from 'react';
import {
  estimateColor,
  creativeDevelopmentColor,
  preProductionColor,
  productionColor,
  postProductionColor,
  completedColor,
} from '@/Components/Scripts/ProjectColors';



function MultiCircularProgress({ 

  projects,
  padding,
  estimateProjects,
  creativeDevelopmentProjects,
  preProductionProjects,
  productionProjects,
  postProductionProjects,
  completedProjects,
  multiCircularProgressSize,
  
 }) {

  const totalProject = projects.length;

  const totalStages = [
    estimateProjects.length,
    creativeDevelopmentProjects.length,
    preProductionProjects.length,
    productionProjects.length,
    postProductionProjects.length,
    completedProjects.length,
  ];

  const percentages = totalStages.map(stageCount => `${(stageCount / totalProject) * 100}%`);


  let backgroundStyles = `
    linear-gradient( #f3f3f3 , #f3f3f3) content-box,
    conic-gradient(
      ${estimateColor} 0 var(--p1),
      ${creativeDevelopmentColor} calc(var(--p1) + 0%) calc(var(--p1) + var(--p2)),
      ${preProductionColor} calc(var(--p1) + var(--p2) + 0%) calc(var(--p1) + var(--p2) + var(--p3)),
      ${productionColor} calc(var(--p1) + var(--p2) + var(--p3) + 0%) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4)),
      ${postProductionColor} calc(var(--p1) + var(--p2) + var(--p3) + var(--p4)) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5)),
      ${completedColor} calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5)) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5) + var(--p6))
  ) `;


  const p1Condition = totalProject === 0 ? '100%' : percentages[0];
  const p2Condition = totalProject === 0 ? '0%' : percentages[1];
  const p3Condition = totalProject === 0 ? '0%' : percentages[2];
  const p4Condition = totalProject === 0 ? '0%' : percentages[3];
  const p5Condition = totalProject === 0 ? '0%' : percentages[4];
  const p6Condition = totalProject === 0 ? '0%' : percentages[5];
  
  return (

      <div>
        <div className={`bar ${multiCircularProgressSize} flex flex-col`}
          style={{ 
           "padding": padding,
           "--p1": p1Condition, // Use the conditional value for --p1
           "--p2": p2Condition,
           "--p3": p3Condition,
           "--p4": p4Condition,
           "--p5": p5Condition,
           "--p6": p6Condition,
            background: backgroundStyles, // Set the background dynamically
          }}
          >
            <span className='text-[3rem] -mt-5 -mb-1'>{totalProject}</span>
            <h3>Project{totalProject > 1 && ('s')}</h3>
        </div>
      </div>  

  );
}

export default MultiCircularProgress;
