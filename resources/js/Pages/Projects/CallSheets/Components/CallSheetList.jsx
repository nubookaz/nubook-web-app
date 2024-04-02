import { useModal } from '@/Components/Contexts/ModalContext';
import { useProject } from '@/Components/Contexts/ProjectContext';
import { useCallSheet } from '@/Components/Contexts/CallSheetContext';
import { useAuth } from '@/Components/Contexts/AuthContext';


import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBoxArchive, faPencil } from '@fortawesome/free-solid-svg-icons';

export default function CallSheetList({ }) {

  const { userData } = useAuth();
  const { currentProjectId } = useProject();
  const { callSheets, setCurrentCallSheetId } = useCallSheet();

  const handleSelectCallSheet = (callSheetId) => {
      setCurrentCallSheetId(callSheetId);
  };

  const { toggleModal } = useModal();
  const handleNewCallSheetClick = () => {
      toggleModal({type: 'newCallSheetForm', data: 'create'});  
  };

  const [filteredCallSheets, setFilteredCallSheets] = useState([]);
  useEffect(() => {
      setFilteredCallSheets(callSheets);
  }, [callSheets]);

  const handleDeleteClick = async (callSheetId) => {
      if (window.confirm('Are you sure you want to delete this call sheet?')) {
        await deleteCallSheet(callSheetId);
      }
  };
  console.log(userData);

  function formatDate(dateString) {
      const date = new Date(dateString + 'Z'); // Appending 'Z' to indicate UTC

      const formattedDate = date.toLocaleString('en-US', {
        timeZone: "UTC", // Specify UTC timezone
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const day = date.getUTCDate(); // Using getUTCDate to get the day in UTC
      let suffix = 'th';
      if (day % 10 === 1 && day !== 11) suffix = 'st';
      else if (day % 10 === 2 && day !== 12) suffix = 'nd';
      else if (day % 10 === 3 && day !== 13) suffix = 'rd';

      return formattedDate.replace(/\d+/, `${day}${suffix}`);
  }

  
  function formatTime(dateTimeString) {
      const date = new Date(dateTimeString);

      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
  }
  


  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-10 flex-wrap h-full px-6">
        <div onClick={handleNewCallSheetClick} className='border-2 border-dashed border-slate-300 duration-500 bg-white hover:border-dashed hover:border-slate-400 cursor-pointer px-[4rem] text-center text-xl text-slate-300 rounded-lg h-full w-full flex justify-center items-center m-auto hover:bg-slate-300 hover:text-slate-500'>
            Click here to create a new call sheet!
        </div>

        {filteredCallSheets.map(callSheet => (
            <div key={callSheet.id} className="letter mx-3 w-full relative group cursor-pointer" onClick={() => handleSelectCallSheet(callSheet.id)}>

                <Link className="block w-full h-full absolute inset-0" href={route('callSheet.details.page', { projectId: currentProjectId, callSheetId: callSheet.id })}></Link>
                {  console.log(callSheet.call_sheet_date_time) }

                <div>
                    <span className='font-normal text-xs bg-slate-50 px-4 py-1 flex text-center rounded mb-2 w-fit'>{callSheet.status}</span>
                    <h2 className='font-normal text-xl'>{callSheet.call_sheet_name}</h2>
                    <p className='font-normal text-sm'>Scheduled Date:{formatDate(callSheet.call_sheet_date_time)}</p>

                    <div className='mt-8'>
                        <h4>General Call Time:</h4>
                        <p className='text-xl text-emerald-500 font-bold'>{formatTime(callSheet.call_sheet_date_time)}</p>
                    </div>
                </div>

                <div className='opacity-0 group-hover:opacity-100 duration-500 transition-all absolute bottom-4 right-4 flex flex-row gap-4'>
                    <Link href={route('callSheet.details.page', { projectId: currentProjectId, callSheetId: callSheet.id })}>
                      <FontAwesomeIcon icon={faPencil} className='w-4 p-[.85rem] rounded-full border-2 hover:text-emerald-500 hover:border-emerald-500 hover:bg-slate-100 duration-500 transition-all' />
                    </Link>

                    <button onClick={(event) => handleDeleteClick(event, callSheet.id)} >
                      <FontAwesomeIcon icon={faBoxArchive} className='w-4 p-[.85rem] rounded-full border-2 hover:text-rose-500 hover:border-rose-500 hover:bg-slate-100 duration-500 transition-all' />
                    </button>
                </div>
            </div>
        ))}

    </div>
  );
}

