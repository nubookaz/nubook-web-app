import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';
import EmailStep from '@/Pages/Auth/Registration/Partials/EmailStep';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Link } from '@inertiajs/react';















export default function RegisterEmail() {
    const [isValidStepOne, setIsValidStepOne] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
      });

      const verifyEmail = () => {
        return new Promise((resolve, reject) => {
            router.post(route('register'), {
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            }, {
                onSuccess: (response) => {
                    console.log('Registration response:', response);
                    if (response.success) {
                        setRegistrationComplete(true);
                        resolve('User registered successfully');
                        setErrorText(''); // Clear any previous errors on success
                    } else {
                        console.error('Error:', response.error);
                        reject('Error during registration');
                        setErrorText(response.error.message || 'Error during registration');
                    }
                },
                onError: (error) => {
                    console.error('Error registering user:', error);
                    reject('Error during registration');
                    setErrorText(error.message || 'Error during registration');
                },
            });
        });
    };
    
    


    const handleVerification = async () => {
        try {
          await verifyEmail();
        } catch (error) {
          // Error is already handled in verifyEmail function
        }
      };
    


    // // Validation function
    // const isInputValid = () => {
    //     const areAllFieldsFilled = emailValue.trim() !== '' && passwordValue.trim() !== '' && passwordConfirmationValue.trim() !== '';
    //     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue); // Email format validation
    //     const isPasswordValid = passwordValue.length >= minLength;
    //     const doPasswordsMatch = passwordValue === passwordConfirmationValue; // Password confirmation match validation
    //     console.log('areAllFieldsFilled:', areAllFieldsFilled);
    //     console.log('isEmailValid:', isEmailValid);
    //     console.log('isPasswordValid:', isPasswordValid);
    //     console.log('doPasswordsMatch:', doPasswordsMatch);
    //     return areAllFieldsFilled && isEmailValid && isPasswordValid && doPasswordsMatch;
    // };











    // // Update isValidStepOne when inputs change
    // useEffect(() => {
    //     const isValid = isInputValid();
    //     console.log('isValidStepOne:', isValid);
    //     setIsValidStepOne(isValid);
    // }, [emailValue, passwordValue, passwordConfirmationValue, setIsValidStepOne]);














    return (






        <GuestLayout>
            {{
                form: (
                    <div>
                        <EmailStep formData={formData} setFormData={setFormData} errorText={errorText}  />
                    </div>
                ),
                footer: (
                    <div>
                        <div className="mb-4">
                            <SecondaryButton onClick={verifyEmail} disabled={!isValidStepOne}>
                                Register
                            </SecondaryButton>
                        </div>

                        <div>
                            <Link
                                href={route('login')}
                                className="text-sm secondary-color"
                            >
                                Already registered?
                            </Link>
                        </div>
                    </div>
                ),
            }}            
        </GuestLayout>





        
    );







}





                                        