import React, { useState, useEffect } from 'react';

import Textarea from '@mui/joy/Textarea';


function EOD() {
  // Component logic and state for EOD can go here

  return (
    
    <div className="flex flex-row w-full">
        <div className='ml-3 text-center font-bold text-white flex flex-col justify-center h-full text-sm w-full'>End of Day</div>
        <div className='flex content-center h-full w-full max-w-[45%] py-1'>
            <Textarea
              maxLength={220}
              placeholder="Notes...."
              sx={[
                  {
                    '--Textarea-placeholderColor': '#fff',
                    'fontSize': '.75rem',
                    'padding': '.25rem',
                  }
              ]}
            />
          </div>
    </div>

  );
}

export default EOD;
