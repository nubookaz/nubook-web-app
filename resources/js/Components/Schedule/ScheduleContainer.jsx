import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons';

 import Scene from '@/Components/Schedule/Scene';
import Break from '@/Components/Schedule/Break';
import Move from '@/Components/Schedule/Move';
import EOD from '@/Components/Schedule/EOD';

export default function ScheduleContainer({ 
  
  data,
  type, 
  dragHandleProps,
  onDelete,
  onUpdateInfo,
  scheduleSceneData,
  scheduleBreakData,
  ...props

}) {

 
  const [combinedClass, setCombinedClass] = useState('');

   const receiveClassFromChild = (classValue) => {
    setCombinedClass(classValue);
  };

  const getTypeBasedClass = () => {
    switch (type) {
      case 'scene':
        return '';
      case 'break':
        return 'bg-slate-600 !text-white';
      case 'move':
        return '!bg-stone-600 !text-white';
      case 'eod':
        return '!bg-slate-900 !text-white';
      default:
        return '';
    }
  };

  const renderComponentBasedOnType = () => {
    switch (type) {
      case 'scene':
        return <Scene 
                  data={data}
                  scheduleSceneData={scheduleSceneData}
                  onUpdateInfo={onUpdateInfo} 
                  lightColorClass={lightColorClass} 
                  sendClassToParent={receiveClassFromChild} 
                />;

      case 'break':
        return <Break 
                  data={data}
                  scheduleBreakData={scheduleBreakData}
                  lightColorClass={lightColorClass} 
                  onUpdateInfo={onUpdateInfo} 
                  sendClassToParent={receiveClassFromChild} 
                />;
      case 'move':
        return <Move 
                  data={data}
                  lightColorClass={lightColorClass} 
                  scheduleBreakData={scheduleBreakData}
               />;
      case 'eod':
        return <EOD />;
      default:
        return null; 
    }
  };



  const isBackgroundDark = () => {
    // List of classes that indicate a dark background
    const darkClasses = [
      'bg-blue-800', 
      'bg-purple-800', 
      'bg-orange-500',
      'bg-pink-500',
      'bg-violet-300',
      'bg-red-400',
      'bg-red-600',
      'bg-gray-900',
      'bg-gray-800',
      'bg-purple-500',
      'bg-purple-700',
      'bg-orange-600',
      'bg-orange-700',
      'bg-yellow-600',
      'bg-yellow-500',
      'bg-indigo-300',
      'bg-slate-500',
      'bg-slate-600',
    ]; 

    // Check if combinedClass contains any of the dark classes
    return darkClasses.some(darkClass => combinedClass.includes(darkClass));
};


  const lightColorClass = isBackgroundDark() ? '!text-white' : '!text-slate-500 font-semibold'; // Adjust as needed

  const dragHandle = type !== 'eod' ? dragHandleProps : {};


  return (
      <>
        <div className={`schedule-container group flex flex-row gap-4 rounded-md px-6 py-2 pr-2 scene-style h-[4.2rem] ${getTypeBasedClass()} ${combinedClass}`}>
            {type !== 'eod' && (
                <div className="flex h-full mr-10 my-auto" {...dragHandle}>
                  <FontAwesomeIcon className={`my-auto ${lightColorClass}`} icon={faBars} />          
                </div>
            )}
            <div className="col w-full h-full my-auto">
              <div className="flex flex-row h-full w-full my-auto">
                {renderComponentBasedOnType()}
              </div>
            </div>
            <div className="opacity-0 h-full my-auto p-2 group-hover:opacity-100 duration-500" onClick={onDelete}>
              <FontAwesomeIcon className={`my-auto text-sm ${lightColorClass == '!text-white' ? 'text-white hover:bg-white hover:text-red-500' : 'text-rose-600 hover:bg-red-500 hover:text-white' } cursor-pointer p-[.6rem]  duration-500 w-[1rem] h-[1rem] rounded-full`} icon={faTrashCan} />          
            </div>
        </div>
      </>

   );
}

 