import { useState, useEffect } from 'react';

 import FormControl from '@mui/joy/FormControl';
 import FormHelperText from '@mui/joy/FormHelperText';
 import Link from '@mui/joy/Link';
 import Typography from '@mui/joy/Typography';
 import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import LinearProgress from '@mui/joy/LinearProgress';


import { formGroupClass, inputGroupClass } from '@/Components/Scripts/Form';
import Checkbox from '@mui/joy/Checkbox';
import Skeleton from '@mui/joy/Skeleton';




export default function EmailStep({ showConsentError, formData, setFormData, errors, linkPrivacyPolicy, privacyPolicyHref, skeleton }) {
    const { email, password, password_confirmation, consent } = formData;
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState(password);
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState(password_confirmation);
    const [consentValue, setConsentValue] = useState(consent);





    
    const [showEmailHelperText, setShowEmailHelperText] = useState(false);
    const [showPasswordHelperText, setShowPasswordHelperText] = useState(false);
    const [showPasswordConfirmationHelperText, setShowPasswordConfirmationHelperText] = useState(false);
    const [showConsentHelperText, setShowConsentHelperText] = useState(false);

    const minLength = 6;
    


    useEffect(() => {
        if (showConsentError) {
            setShowConsentHelperText(true);
        }
    }, [showConsentError]);

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

    const shouldShowConsentHelperText = () => {
        return showConsentHelperText && !consentValue;
    };
    









    return (
        <div className='flex flex-col gap-2'>

            <div className='flex flex-col gap-2 h-full' spacing={0.5} sx={{ '--hue': Math.min(emailValue.length * 10, 120) }}>

                <FormControl error={shouldShowEmailHelperText()} className="flex flex-col gap-2">
                    <label htmlFor="email" value="email" className='text-gray-400 text-sm'> Email Address * </label>
                    {skeleton ? (

                        <Skeleton variant="rectangular" sx={{ height: "46px", marginBottom: '.5rem' }}/>

                    ):(
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="indy@indianjones.com"
                            onChange={(event) => {
                                setEmailValue(event.target.value);
                                setFormData((prevData) => ({ ...prevData, email: event.target.value }));
                            }}
                            onBlur={() => setShowEmailHelperText(true)}
                            value={emailValue}
                            required
                        />
                    )}

                  
                </FormControl>


                <FormControl error={shouldShowPasswordHelperText()} className="flex flex-col gap-2">
                    <label htmlFor="password" value="password" className='text-gray-400 text-sm'> Password * </label>
                    {skeleton ? (

                        <Skeleton variant="rectangular" sx={{ height: "46px", marginBottom: '.5rem' }}/>

                    ):(
                        <>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                className='-mb-[.15rem]'
                                onChange={handlePasswordChange}
                                value={passwordValue}
                                required
                                onBlur={() => setShowPasswordHelperText(true)}
                            />
                            <LinearProgress
                                determinate
                                size="sm"
                                className='mx-1'
                                value={Math.min((passwordValue.length / minLength) * 100, 100)}
                                sx={{
                                    background: 'transparent',
                                    color: passwordValue.length >= minLength ? 'green' : 'red',
                                }}
                            />
                        </>
                    )}

                </FormControl>


                <FormControl error={shouldShowPasswordConfirmationHelperText()} className="flex flex-col gap-2">
                    <label htmlFor="password_confirmation" value="password_confirmation" className='text-gray-400 text-sm'> Confirm Password * </label>
                    {skeleton ? (

                        <Skeleton variant="rectangular" sx={{ height: "46px", marginBottom: '.5rem' }}/>

                    ):(
                        <>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                autoComplete="new-password"
                                className='-mb-[.15rem]'
                                onChange={handlePasswordConfirmationChange}
                                value={passwordConfirmationValue}
                                required
                                onBlur={() => setShowPasswordConfirmationHelperText(true)}
                            />
                            <LinearProgress
                                determinate 
                                size="sm"
                                className='mx-1'
                                value={Math.min((passwordConfirmationValue.length / minLength) * 100, 100)}
                                sx={{
                                    background: 'transparent',
                                    color: passwordConfirmationValue.length >= minLength ? 'green' : 'red',
                                }}
                            />
                        </>
                    )}

                </FormControl>

                <FormControl size="sm" error={shouldShowConsentHelperText()} className="flex flex-col mt-4">
                    {skeleton ? (
                        <div className='flex flex-row gap-2'>
                            <Skeleton variant="rectangular" sx={{ height: "18px", width: "22px"}}/>
                            <Typography fontSize=".80rem" >
                                <Skeleton>
                                    I agree to the collection and use of my geolocation data for personalizing content
                                </Skeleton>
                            </Typography>
                        </div>
                    ):(
                        <>
                            <Checkbox 
                                color="primary"
                                checked={consentValue || false }
                                size="sm"
                                required
                                label="I agree to the collection and use of my geolocation data for personalizing content" 
                                onChange={(event) => {
                                    const newConsentValue = event.target.checked;
                                    setConsentValue(newConsentValue); // Update the state
                                    setFormData(prevData => ({ ...prevData, consent: newConsentValue })); // Update formData
                                    setShowConsentHelperText(!newConsentValue); // Show helper text if unchecked
                                }}
                                sx={{
                                    fontSize: '.80rem',
                                    color: 'text-slate-50',
                                }}
                            />
                            <FormHelperText>
                                <span className='font-bold primary-color mt-1'>
                                    Read our <a className='cursor-pointer' href={privacyPolicyHref} onClick={linkPrivacyPolicy}>privacy policy</a>.
                                </span>
                            </FormHelperText>
                        </>
                    )}
                </FormControl>
            </div>



            <div className='flex flex-col gap-2 mt-4'>

                {
                    (errors.email || errors.password || errors.consent) && (
                        <div className="errors text-center p-4 bg-red-50 rounded-xl" style={{ color: 'red' }}>
                            <p>
                                {errors.email && <span className='text-red-600 text-xs font-bold'>{errors.email} </span>}
                                {errors.password && <span className='text-red-600 text-xs font-bold'>{errors.password} </span>}
                                {errors.consent && <span className='text-red-600 text-xs font-bold'>{errors.consent}</span>}
                            </p>
                        </div>
                    )
                }


                {shouldShowEmailHelperText() && (
                    <FormHelperText className="!text-red-600 !text-xs font-bold">
                        <InfoOutlined className='mr-2'/> Opps! Please enter a valid email.
                    </FormHelperText>
                )}

                {shouldShowPasswordHelperText() && (
                    <FormHelperText className="!text-red-600 !text-xs font-bold">
                        <InfoOutlined className='mr-2'/> Oops! Password must be at least {minLength} characters.
                    </FormHelperText>
                )}


                {shouldShowPasswordConfirmationHelperText() && (
                    <FormHelperText className="!text-red-600 !text-xs font-bold">
                        <InfoOutlined className='mr-2'/> Oops! Password confirmation must match the password and be at least {minLength} characters.
                    </FormHelperText>
                )}

                {shouldShowConsentHelperText() && (
                    <FormHelperText className="!text-red-600 !text-xs font-bold">
                        <InfoOutlined className='mr-2'/>Please agree to the privacy policy to proceed.
                    </FormHelperText>
                )}

            </div>
           
        </div>



    );


}