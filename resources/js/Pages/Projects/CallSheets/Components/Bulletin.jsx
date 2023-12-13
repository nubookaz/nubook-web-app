import React, { useEffect, useState } from 'react';

import CardContainer from '@/Components/Containers/CardContainer';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';








export default function Bulletin({ data, onBulletinTextChange }) {

    const [text, setText] = React.useState('');
    const maxLength = 400; 
    const remainingCharacters = maxLength - text.length;



    useEffect(() => {
        if (onBulletinTextChange) {
            onBulletinTextChange(text);
        }
    }, [text, onBulletinTextChange]);




    return (

        <CardContainer className="h-[20rem]" header="Bulletin">
            <Textarea 
                name="Soft" 
                size="sm" 
                variant="soft" 
                minRows={5.5} 
                maxRows={6}
                defaultValue={data.bulletin}
                placeholder="Type anything…" 
                maxLength={maxLength} 
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); 
                    }
                }}
                onChange={(event) => {
                    if (event.target.value.length <= maxLength) {
                        setText(event.target.value);
                    }
                }}                                                    
                endDecorator={
                    <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {text.length} / {maxLength} character(s) ({remainingCharacters} remaining)
                    </Typography>
                }
            />
        </CardContainer>

    );

}

