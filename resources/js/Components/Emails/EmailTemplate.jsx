import React, { useState } from 'react';
import EmailContainer from './EmailContainer';
import CardContainer from '@/Components/Containers/CardContainer';

const EmailTemplate = ({ name }) => {
  return (
    <EmailContainer>
      <CardContainer className="h-full">
        <p>Hello {name},</p>
        <p>This is a sample email template created with React.</p>
        <p>Best regards,</p>
        <p>Your Name</p>
      </CardContainer>
    </EmailContainer>
  );
};


export default EmailTemplate;
