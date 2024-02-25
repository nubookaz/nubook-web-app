import { useModal } from '@/Components/Contexts/ModalContext';
import { useSchedule } from '@/Components/Contexts/ScheduleContext';

import React, { useState, useEffect } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import EmptyContent from '@/Components/Layouts/EmptyContent';

const ProductionScheduleRow = ({ row }) => {
  // Define Tailwind CSS classes for each row type
  const backgroundColorClasses = {
    Scene: 'bg-slate-50', // Light grey
    Break: 'bg-amber-500', // Amber
    'Company Move': 'bg-slate-500' // Blue for Company Move, adjusted from 'bg-slate-500' for better contrast
  };

  // Get the current row's Tailwind CSS background color class based on its type, defaulting to a light color if not found
  const currentBackgroundColorClass = backgroundColorClasses[row.type] || 'bg-white shadow-md';

  // Apply the Tailwind CSS class directly within the component's className attribute
  return (
    <tr className={`${currentBackgroundColorClass}`}>
      {row.type === 'Scene' ? (
        <>
          <td>{row.columns.sceneNumber}</td>
          <td className='text-center'>{row.columns.setting}</td>
          <td className='text-center'>{row.columns.timeOfDay}</td>
          <td className='text-center'>{row.columns.shootLocation}</td>
          <td className='text-right'>{row.columns.startTime}</td>
        </>
      ) : (
        <>
          <td colSpan="3" className='font-bold !text-white'>{row.columns.breakType}</td>
          <td className='text-center !text-white'>{row.columns.shootLocation}</td>
          <td className='text-right !text-white'>{row.columns.startTime}</td>
        </>
      )}
    </tr>
  );
};


  const ProductionSchedule = ({ project }) => {
    const { rows, addRow, deleteRow, updateRowContent, selectProjectById } = useSchedule();
    const { toggleModal } = useModal();
  
    console.log(rows);
    const [initialRows, setInitialRows] = React.useState([]);
  
    useEffect(() => {
      const schedules = project.production_schedules && project.production_schedules.length > 0
        ? JSON.parse(project.production_schedules[0].schedule)
        : [];
      setInitialRows(schedules);
    }, [project.production_schedules]);
  
    const handleProductionScheduleClick = () => {
      toggleModal({type: 'productionSchedule'});  
    };
  
    return (
      <CardContainer className='h-full' header="Production Schedule" onClick={handleProductionScheduleClick}>
        {initialRows.length > 0 ? (
           <div className="w-full overflow-x-auto">
            <table id='production-schedule-ui' className="min-w-full">
              <thead>
                <tr>
                  <th scope="col" className="text-left text-[.70rem] font-bold text-slate-500 uppercase tracking-wider">Scene #</th>
                  <th scope="col" className="text-center text-[.70rem] font-bold text-slate-500 uppercase tracking-wider">Setting</th>
                  <th scope="col" className="text-center text-[.70rem] font-bold text-slate-500 uppercase tracking-wider">Timeslot</th>
                  <th scope="col" className="text-center text-[.70rem] font-bold text-slate-500 uppercase tracking-wider">Shoot Location</th>
                  <th scope="col" className="text-right text-[.70rem] font-bold text-slate-500 uppercase tracking-wider">Start Time</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {initialRows.map((row, index) => (
                  <ProductionScheduleRow key={`row-${index}`} row={row} />
                ))}
              </tbody>
            </table>
          </div>
        ):(
          <EmptyContent
              className='saturate-0'
              imageUrl='/images/svg_images/schedule.svg'
              buttonText='Add a production schedule'
              onClick={handleProductionScheduleClick}
              svgClass='max-w-[12rem]'
          >
              {{
                  description: (
                      <p className='text-slate-300 max-w-[22rem]'>You have not entered a production schedule yet. Add one now!</p>
                  )
              }}
          </EmptyContent>
        )}
      </CardContainer>
     
    );
  };
  
  export default ProductionSchedule;