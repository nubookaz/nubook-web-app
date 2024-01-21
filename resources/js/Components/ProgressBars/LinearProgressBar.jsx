import React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
 
export default function LinearProgressBar() {

 

  return (
    <LinearProgress
      determinate
      variant="outlined"
      color="neutral"
      size="sm"
      thickness={24}
    sx={{
        '--LinearProgress-radius': '20px',
        '--LinearProgress-thickness': '15px',
      }}
    >
      <Typography
        level="body-xs"
        fontWeight="lg"
        textColor="#fff"
        sx={{ mixBlendMode: 'difference' }}
      >
        Percentage  
      </Typography>
    </LinearProgress>
  );


 
}