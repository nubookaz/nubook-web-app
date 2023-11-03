import React from 'react';

import Switch, { switchClasses } from '@mui/joy/Switch';











function CallSheetDetailsForm({ callSheetData, setCallSheetTitle, setCallSheetDate, checkFormStatus }) {
    const { callSheetTitle, callSheetDate } = callSheetData;
    const [checked, setChecked] = React.useState(false);

    const isFormFilled = checkFormStatus();


  return (


    <div >
        <div className="mb-6 form-group">
            <div className='w-full input-group mb-2'>        
                 <input
              placeholder="Call Sheet Title"
              defaultValue={callSheetTitle}

              onChange={(e) => {
                const newCallSheetTitle = e.target.value;
                setCallSheetTitle(newCallSheetTitle);
              }}
              
            />
            </div>
            <div className='w-full input-group'>
           <input
              placeholder="Call Sheet Date"
              type="date"
              defaultValue={callSheetDate}
              onChange={(e) => {
                const newCallSheetDate = e.target.value;
                setCallSheetDate(newCallSheetDate); // Update parent component's state
              }}
            />
            </div>
        </div>
        {/* <div className="mb-6 mt-8 form-group">
            <div className='primary-color'>
                <h2>Settings</h2>
                <p className='mb-8'>You can adjust sending options here</p>
                <div className='toggle-settings flex flex-col mb-8 w-full'>
                    <div className='toggle-group flex flex-row w-full mb-4 justify-between'>
                        <p className='justify-start'>Copy me on all emails sent</p>
                        <Switch
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            sx={(theme) => ({
                                '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                '--Switch-thumbSize': '27px',
                                '--Switch-trackWidth': '51px',
                                '--Switch-trackHeight': '31px',
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                [`& .${switchClasses.thumb}`]: {
                                transition: 'width 0.2s, left 0.2s',
                                },
                                '&:hover': {
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                },
                                '&:active': {
                                '--Switch-thumbWidth': '32px',
                                },
                                [`&.${switchClasses.checked}`]: {
                                '--Switch-trackBackground': 'rgb(48 209 88)',
                                '&:hover': {
                                    '--Switch-trackBackground': 'rgb(48 209 88)',
                                },
                                },
                            })}
                            />               
                    </div>
                    <div className='toggle-group flex flex-row w-full mb-4 justify-between'>
                        <p className='justify-start'>Send to all options</p>
                        <Switch
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            sx={(theme) => ({
                                '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                '--Switch-thumbSize': '27px',
                                '--Switch-trackWidth': '51px',
                                '--Switch-trackHeight': '31px',
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                [`& .${switchClasses.thumb}`]: {
                                transition: 'width 0.2s, left 0.2s',
                                },
                                '&:hover': {
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                },
                                '&:active': {
                                '--Switch-thumbWidth': '32px',
                                },
                                [`&.${switchClasses.checked}`]: {
                                '--Switch-trackBackground': 'rgb(48 209 88)',
                                '&:hover': {
                                    '--Switch-trackBackground': 'rgb(48 209 88)',
                                },
                                },
                            })}
                            /> 
                    </div>
                    <div className='sending-options flex flex-col w-full'>
                            <div className='toggle-group flex flex-row w-full mb-4 justify-between'>
                                <p className='justify-start ml-6'>Send emails</p>
                                <Switch
                                    checked={checked}
                                    onChange={(event) => setChecked(event.target.checked)}
                                    sx={(theme) => ({
                                        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                        '--Switch-thumbSize': '27px',
                                        '--Switch-trackWidth': '51px',
                                        '--Switch-trackHeight': '31px',
                                        '--Switch-trackBackground': theme.vars.palette.background.level3,
                                        [`& .${switchClasses.thumb}`]: {
                                        transition: 'width 0.2s, left 0.2s',
                                        },
                                        '&:hover': {
                                        '--Switch-trackBackground': theme.vars.palette.background.level3,
                                        },
                                        '&:active': {
                                        '--Switch-thumbWidth': '32px',
                                        },
                                        [`&.${switchClasses.checked}`]: {
                                        '--Switch-trackBackground': 'rgb(48 209 88)',
                                        '&:hover': {
                                            '--Switch-trackBackground': 'rgb(48 209 88)',
                                        },
                                        },
                                    })}
                                    /> 
                            </div>
                            <div className='toggle-group flex flex-row w-full mb-4 justify-between'>
                                <p className='justify-start ml-6'>Send Text Messages</p>
                                <Switch
                                    checked={checked}
                                    onChange={(event) => setChecked(event.target.checked)}
                                    sx={(theme) => ({
                                        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                        '--Switch-thumbSize': '27px',
                                        '--Switch-trackWidth': '51px',
                                        '--Switch-trackHeight': '31px',
                                        '--Switch-trackBackground': theme.vars.palette.background.level3,
                                        [`& .${switchClasses.thumb}`]: {
                                        transition: 'width 0.2s, left 0.2s',
                                        },
                                        '&:hover': {
                                        '--Switch-trackBackground': theme.vars.palette.background.level3,
                                        },
                                        '&:active': {
                                        '--Switch-thumbWidth': '32px',
                                        },
                                        [`&.${switchClasses.checked}`]: {
                                        '--Switch-trackBackground': 'rgb(48 209 88)',
                                        '&:hover': {
                                            '--Switch-trackBackground': 'rgb(48 209 88)',
                                        },
                                        },
                                    })}
                                    />
                            </div>
                        </div>
                    <div className='toggle-group flex flex-row w-full mb-4 justify-between'>
                        <p className='justify-start'>Include messages including private</p>
                        <Switch
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            sx={(theme) => ({
                                '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
                                '--Switch-thumbSize': '27px',
                                '--Switch-trackWidth': '51px',
                                '--Switch-trackHeight': '31px',
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                [`& .${switchClasses.thumb}`]: {
                                transition: 'width 0.2s, left 0.2s',
                                },
                                '&:hover': {
                                '--Switch-trackBackground': theme.vars.palette.background.level3,
                                },
                                '&:active': {
                                '--Switch-thumbWidth': '32px',
                                },
                                [`&.${switchClasses.checked}`]: {
                                '--Switch-trackBackground': 'rgb(48 209 88)',
                                '&:hover': {
                                    '--Switch-trackBackground': 'rgb(48 209 88)',
                                },
                                },
                            })}
                            />
                    </div>
                </div>
            </div>
        </div> */}
    </div>



  );
}








export default CallSheetDetailsForm;
