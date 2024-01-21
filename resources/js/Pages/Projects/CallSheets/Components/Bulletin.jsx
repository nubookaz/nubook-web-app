import { useSnack } from '@/Components/Contexts/SnackContext';

import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from "lodash";

import CardContainer from '@/Components/Containers/CardContainer';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

export default function Bulletin({ 
    
    callSheet, 
    isSave = false, 

}) {

    const { setSnackContent, setIsSnackOpen } = useSnack();

    const [text, setText] = useState(callSheet.bulletin || '');
    const maxLength = 365; 

    const updateBulletin = useCallback(debounce(async (newBulletin) => {
        
        try {
            const response = await axios.put(route('projects.callSheets.update.bulletin', { id: callSheet.project_id, callSheetId: callSheet.id }), {
                bulletin: newBulletin,
            });
    
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Failed to update bulletin');
            }
            setTimeout(() => {
                setSnackContent('Bulletin updated successfully');
                setIsSnackOpen(true);
            }, 600);
            
         } catch (error) {
            console.error(error);

            setSnackContent('Failed to update bulletin');
            setIsSnackOpen(false);
        }

    }, 600), []);


    const handleTextChange = (event) => {
        let inputText = event.target.value;
        // Replace newlines with empty strings to remove paragraph spaces
        inputText = inputText.replace(/\n/g, "");

        if (inputText.length > maxLength) {
            inputText = inputText.substring(0, maxLength);
        }
        setText(inputText);
        if (isSave) {
            updateBulletin(inputText);
        }
    };
    
    return (
        <CardContainer header="Bulletin">
            <Textarea 
                name="bulletin" 
                size="sm" 
                variant="soft" 
                minRows={4} 
                maxRows={4}
                value={text}
                placeholder="Type anything…" 
                className='!bg-slate-100'
                maxLength={maxLength} 
                onChange={handleTextChange}                                     
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                    }
                }}
                endDecorator={
                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {text.length} / {maxLength} character(s) ({maxLength - text.length} remaining)
                    </Typography>
                }
            />
        </CardContainer>
    );
}
