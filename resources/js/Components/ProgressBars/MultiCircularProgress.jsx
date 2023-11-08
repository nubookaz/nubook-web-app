import React, { useState, useEffect } from 'react';
import {
  estimateBackgroundColor,
  creativeDevelopmentBackgroundColor,
  preProductionBackgroundColor,
  productionBackgroundColor,
  postProductionBackgroundColor,
  completedBackgroundColor,
} from '@/Components/Projects/ProjectBgColors';



function MultiCircularProgress({ 
  projects,
  estimateProjects,
  creativeDevelopmentProjects,
  preProductionProjects,
  productionProjects,
  postProductionProjects,
  completedProjects,
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


  const backgroundStyles = `
    linear-gradient( #f3f3f3 , #f3f3f3) content-box,
    conic-gradient(
      ${estimateBackgroundColor} 0 var(--p1),
      ${creativeDevelopmentBackgroundColor} calc(var(--p1) + 0%) calc(var(--p1) + var(--p2)),
      ${preProductionBackgroundColor} calc(var(--p1) + var(--p2) + 0%) calc(var(--p1) + var(--p2) + var(--p3)),
      ${productionBackgroundColor} calc(var(--p1) + var(--p2) + var(--p3) + 0%) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4)),
      ${postProductionBackgroundColor} calc(var(--p1) + var(--p2) + var(--p3) + var(--p4)) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5)),
      ${completedBackgroundColor} calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5)) calc(var(--p1) + var(--p2) + var(--p3) + var(--p4) + var(--p5) + var(--p6))
    )`;
  

  return (

      <div>
        <div className="bar w-[250px] h-[250px] flex flex-col" 
          style={{ 
           "padding": "30px",
            "--p1": percentages[0],
            "--p2": percentages[1], 
            "--p3": percentages[2], 
            "--p4": percentages[3], 
            "--p5": percentages[4], 
            "--p6": percentages[5],
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
