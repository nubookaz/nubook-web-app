import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {  useForm } from '@inertiajs/react';
import React from 'react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import PersonalInfo from '@/Pages/Profile/Forms/PersonalInfo';
import CompanyInfo from '@/Pages/Profile/Forms/CompanyInfo';
import Skeleton from '@mui/joy/Skeleton';

export default function VerificationProcess({ 
    currentStep, 
    setCurrentStep, 
    setIsModalOpen,
 }) {

    const [emptyFields, setEmptyFields] = useState({});

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
      
    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };
      
    const [verificationCode, setVerificationCode] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const [personalInfo, setPersonalInfo] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        tel: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
    });

    const [companyInfo, setCompanyInfo] = useState({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });

    const VerificationStep = () => (
        <div>
            <input
                type="text"
                id="verification_code"
                name="code"
                placeholder="One Time Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );

    const handleError = (error, message) => {
        const errorMessage = error.message || message;
        setError(`Error: ${errorMessage}`);
        console.error(`Error: ${errorMessage}`);
        throw error;
    };
    
    const handleResponse = (response, successCallback) => {
        try {
            if (response && response.data) {
                if (response.data.success) {
                    setError('');
                    successCallback();
                } else if (response.data.error) {
                    handleError(new Error(response.data.error), response.data.error);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            handleError(error, 'Unexpected response structure');
        }
    };
    
    
    const savePassword = async () => {
        setIsLoading(true);

        try {
            const response = await axios.post(route('verification.updatePassword'), {
                data: data,
            });
            handleResponse(response, () => {
                if (response.data.success) {
                    setCurrentStep('verification');
                }
s
            });
        } catch (error) {
            handleError(error, 'Error during verification', {
                401: 'Unauthorized: Please log in.',
                403: 'Forbidden: You do not have permission to perform this action.',
                422: 'Validation error: Please check your input.',
                500: 'Internal Server Error: Something went wrong on the server.',
            });        
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post(route('verification.verifyCode'), {
                verificationCode: verificationCode,
            }, {
                headers: {
                    'Accept': 'application.json',
                },
            });
    
            handleResponse(response, () => {
                if (response.data.success) {
                    setCurrentStep('personalInfo');
                }
                // You can handle other cases or conditions here
            });
        } catch (error) {
            handleError(error, 'Error during verification');
        }
    };
    
    const savePersonalInfo = async () => {
        try {
            const response = await axios.post(route('verification.personal.store'), personalInfo);
            handleResponse(response, () => {
                // Handle success case
                setCurrentStep('companyInfo');
            });
        } catch (error) {
            handleError(error, 'Error saving personal information');
        }
    };
    
    
    const saveCompanyInfo = async () => {
        try {
            const response = await axios.post(route('verification.company.store'), companyInfo);
    
            handleResponse(response, () => {
                setCurrentStep('completed'); // Update the step locally
                setIsModalOpen(false); 
                window.location.reload();
            });
        } catch (error) {
            handleError(error, 'Error during company info request');
        }
    };

    console.log(personalInfo);

     return (
        <div className='p-8 w-full !max-w-[70rem] h-[40rem]'>

                {currentStep === 'changePassword' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[15rem]" src="./images/svg_images/undraw_password.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2>Create a Password</h2>
                            <p>
                            Welcome to our platform! For your account security, we kindly request you to create a unique and strong password. Please proceed to set up your password to ensure a secure and personalized experience on our platform. Thank you for choosing us!                           
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password" value="password" className='text-gray-400 text-sm'> Password * </label>
                                    {isLoading ? (
                                        <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                    ):(
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="xxxxxxxxx"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    )}

                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password_confirmation" value="password_confirmation" className='text-gray-400 text-sm'> Confirm Password * </label>
                                    {isLoading ? (
                                        <Skeleton variant="rectangular" sx={{ height: "48px" }}/>
                                    ):(
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="xxxxxxxxx"
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    )}

                                </div>
                                {error && <div style={{ color: 'red' }}>{error}</div>}
                            </div>
                            {isLoading ? (
                             <Skeleton variant="rectangular" sx={{ height: "30px", borderRadius: '50px' }}/>
                            ):(
                            <SecondaryButton onClick={savePassword}>Update Password</SecondaryButton>
                            )}

                        </div>
                    </div>
                }
                {currentStep === 'verification' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[15rem]" src="./images/svg_images/undraw_mailbox.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2>Verify Your Email</h2>
                            <p>
                                To ensure the security of your account, please check your email inbox for a verification code. To complete the verification process, paste the code in the provided field. Thank you for confirming your email address and enhancing your account's security.
                            </p>


                            <VerificationStep />
                            <SecondaryButton onClick={verifyCode}>Verify Code</SecondaryButton>
                        </div>
                    </div>
                }
                {currentStep === 'personalInfo' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[25rem]" src="./images/svg_images/undraw_personal_info.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2>Tell us about yourself...</h2>
                            <p>
                                Please complete the personal information form by providing your first and last name, phone number, and address. Your details are important for us to enhance your experience and ensure accurate communication. Thank you for providing this information.                            
                            </p>
                            <PersonalInfo onUpdateInfo={setPersonalInfo} />
                            <SecondaryButton onClick={savePersonalInfo}>Next</SecondaryButton>
                        </div>
                    </div>
                }
                {currentStep === 'companyInfo' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[25rem]" src="./images/svg_images/undraw_logo_design.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2>Your Company Info</h2>
                            <p>
                                Please complete the company information form by providing essential details about your organization. Your input helps us better tailor our services to your business needs and provide you with the best support. Thank you for sharing this information with us.
                            </p>
                            <span className='text-sm font-semibold'>
                                * If you enter a Company Name then the EIN Number and Job Title will be required
                            </span>
                            <div className='my-6'>
                                <CompanyInfo onUpdateInfo={setCompanyInfo} />
                            </div>
                            
                            <SecondaryButton onClick={saveCompanyInfo}>Complete Registration</SecondaryButton>
                        </div>      
                    </div>
          
                }
            
        </div>
    );
}
