import React, { useState, useEffect } from 'react';

import Textarea from '@mui/joy/Textarea';


function EOD() {
  // Component logic and state for EOD can go here

  return (
    
    <div className="flex flex-row w-full">
        <div className='ml-3 text-center font-bold text-white flex flex-col justify-center h-full text-sm w-full'>End of Day</div>
        <div className='flex content-center h-full w-full max-w-[45%] py-1'>
            <input
              maxLength={220}
              placeholder="Notes...."
              className='grow text-slate-500 text-xs border-0 bg-transparent placeholder:text-white'
            />
          </div>
    </div>

  );
}

export default EOD;
