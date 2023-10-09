import { useState } from 'react';

import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import LinearProgress from '@mui/joy/LinearProgress';


export default function EmailStep({ formData, setFormData, errorText }) {
    const { email, password, password_confirmation } = formData;
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState(password);
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState(password_confirmation);
  
    const [showEmailHelperText, setShowEmailHelperText] = useState(false);
    const [showPasswordHelperText, setShowPasswordHelperText] = useState(false);
    const [showPasswordConfirmationHelperText, setShowPasswordConfirmationHelperText] = useState(false);
    const minLength = 6; // Assuming you have minLength defined somewhere

    
    // Handle the change event for the password input
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPasswordValue(newPassword);
        setFormData((prevData) => ({ ...prevData, password: newPassword }));
        if (!shouldShowPasswordHelperText()) {
            setShowPasswordHelperText(false);
        }
    };   

    // Handle the change event for the password confirmation input
    const handlePasswordConfirmationChange = (event) => {
        const newPasswordConfirmation = event.target.value;
        setPasswordConfirmationValue(newPasswordConfirmation);
        setFormData((prevData) => ({ ...prevData, password_confirmation: newPasswordConfirmation }));
        if (!shouldShowPasswordConfirmationHelperText()) {
            setShowPasswordConfirmationHelperText(false);
        }
    };


    // Helper function to check if email is not filled out or not valid
    const shouldShowEmailHelperText = () => {
        return showEmailHelperText && (emailValue.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));
    };

    // Helper function to check if password input is not filled out or not valid
    const shouldShowPasswordHelperText = () => {
        return showPasswordHelperText && (passwordValue.trim() === '' || passwordValue.length < minLength);
    };

    // Helper function to check if password confirmation input is not filled out or not valid
    const shouldShowPasswordConfirmationHelperText = () => {
        return (
            showPasswordConfirmationHelperText &&
            (passwordConfirmationValue.trim() === '' || passwordConfirmationValue.length < minLength || passwordValue !== passwordConfirmationValue)
        );
    };







    return (
        <Stack spacing={0.5} sx={{ '--hue': Math.min(emailValue.length * 10, 120) }}>

            <FormControl error={shouldShowEmailHelperText()} className="mb-4">
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={(event) => {
                        setEmailValue(event.target.value);
                        setFormData((prevData) => ({ ...prevData, email: event.target.value }));
                    }}
                    onBlur={() => setShowEmailHelperText(true)}
                    value={emailValue}
                    required
                />
                {shouldShowEmailHelperText() && (
                    <FormHelperText className="mt-2">
                        <InfoOutlined /> Opps! Please enter a valid email.
                    </FormHelperText>
                )}
            </FormControl>


            <FormControl error={shouldShowPasswordHelperText()} className="mb-4">
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    value={passwordValue}
                    required
                    onBlur={() => setShowPasswordHelperText(true)}
                />
                <LinearProgress
                    determinate
                    size="sm"
                    value={Math.min((passwordValue.length / minLength) * 100, 100)}
                    sx={{
                        bgcolor: 'background.level3',
                        color: passwordValue.length >= minLength ? 'green' : 'red',
                    }}
                />

                {shouldShowPasswordHelperText() && (
                    <FormHelperText className="mt-2">
                        <InfoOutlined /> Opps! Password must be at least {minLength} characters.
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl error={shouldShowPasswordConfirmationHelperText()} className="mb-4">
                <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    placeholder="Password Confirmation"
                    autoComplete="new-password"
                    onChange={handlePasswordConfirmationChange}
                    value={passwordConfirmationValue}
                    required
                    onBlur={() => setShowPasswordConfirmationHelperText(true)}
                />
                <LinearProgress
                    determinate
                    size="sm"
                    value={Math.min((passwordConfirmationValue.length / minLength) * 100, 100)}
                    sx={{
                        bgcolor: 'background.level3',
                        color: passwordConfirmationValue.length >= minLength ? 'green' : 'red',
                    }}
                />


                {shouldShowPasswordConfirmationHelperText() && (
                    <FormHelperText className="mt-2">
                        <InfoOutlined /> Opps! Password confirmation must match the password and be at least {minLength} characters.
                    </FormHelperText>
                )}
            </FormControl>

            {errorText && <div style={{ color: 'red' }}>{errorText}</div>}


        </Stack>









    );


}