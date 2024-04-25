import { useAuth } from '@/Components/Contexts/AuthContext';

import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {  useForm } from '@inertiajs/react';
import React from 'react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import PersonalInfo from '@/Pages/Profile/Forms/PersonalInfo';
import CompanyInfo from '@/Pages/Profile/Forms/CompanyInfo';
import Skeleton from '@mui/joy/Skeleton';

import VerificationStep from './Partials/VerificationStep';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';

export default function VerificationProcess({ 

    currentStep, 
    setCurrentStep, 

 }) {
    const { setIsModalOpen } = useAuth();

    const [emptyFields, setEmptyFields] = useState({
        first_name: false,
        last_name: false,
        phone_number: false,
        street_address: false,
        city: false,
        state: false,
        zip_code: false,
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });
      
    const [personalInfo, setPersonalInfo] = useState({
        phoneNumber: '',
        name: { first_name: '', middle_initial: '', last_name: '' },
        address: { street_address: '', city: '', state: '', zip_code: '' },
    });

    const [companyInfo, setCompanyInfo] = useState({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });

    const handlePersonalInfoChange = (newData) => {
        setPersonalInfo(prevState => ({ ...prevState, ...newData }));
    };
    
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

    const savePersonalInfo = async () => {
        const newEmptyFields = {
            first_name: !personalInfo.name.first_name,
            last_name: !personalInfo.name.last_name,
        };
    
        setEmptyFields(newEmptyFields);
    
        const hasEmptyFields = Object.values(newEmptyFields).some(value => value);
        if (hasEmptyFields) {
            return; // Exit if there are empty required fields
        }
    
        try {
            // Adjust the data structure as needed for your API endpoint
            const formattedData = {
                firstName: personalInfo.name.first_name,
                lastName: personalInfo.name.last_name,
                middleInitial: personalInfo.name.middle_initial, // Included middle initial
                phoneNumber: personalInfo.phoneNumber,
                address: {
                    streetAddress: personalInfo.address.street_address,
                    city: personalInfo.address.city,
                    state: personalInfo.address.state,
                    zipCode: personalInfo.address.zip_code,
                    latitude: personalInfo.address.latitude,
                    longitude: personalInfo.address.longitude
                }
            };
    
            // Post the data to your endpoint
            const response = await axios.post(route('verification.personal.store'), formattedData);
            handleResponse(response, () => {
                setCurrentStep('companyInfo');
            });
        } catch (error) {
            handleError(error, 'Error saving personal information');
        }
    };
    
    
    const saveCompanyInfo = async () => {

        try {
            const response = await axios.post(route('verification.production.company.store'), companyInfo);
    
            handleResponse(response, () => {
                setCurrentStep('completed'); // Update the step locally
                setIsModalOpen(false); 
                window.location.reload();
            });
        } catch (error) {
            handleError(error, 'Error during company info request');
        }
    };
 
     return (
        <div className='py-8 px-[4rem] w-full !max-w-[80rem] h-[45rem]'>

                {currentStep === 'changePassword' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[15rem]" src="./images/svg_images/undraw_password.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2>Create a Password</h2>
                            <p> Welcome to our platform! For your account security, we kindly request you to create a unique and strong password. Please proceed to set up your password to ensure a secure and personalized experience on our platform. Thank you for choosing us!</p>
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
                             <Skeleton variant="rectangular" sx={{ height: "30px", borderRadius: '10px' }}/>
                            ):(
                            <SecondaryButton onClick={savePassword}>Update Password</SecondaryButton>
                            )}

                        </div>
                    </div>
                }
                {currentStep === 'verification' && 

                    <VerificationStep error={error} handleError={handleError} handleResponse={handleResponse} setError={setError} setCurrentStep={setCurrentStep} />

                }
                {currentStep === 'personalInfo' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-[30rem] h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[20rem]" src="/images/svg_images/undraw_personal_info.svg" alt="" />
                        </div>
                        <div className='w-1/2 py-6 px-6 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2 className='text-2xl text-slate-500'>Tell us about yourself...</h2>
                            <p>
                                Please complete the personal information form by providing your first and last name, phone number, and address. Your details are important for us to enhance your experience and ensure accurate communication. Thank you for providing this information.                            
                            </p>
                            <PersonalInfo onUpdateInfo={handlePersonalInfoChange} emptyFields={emptyFields} setEmptyFields={setEmptyFields} />
                            <PrimaryButton onClick={savePersonalInfo}>Next</PrimaryButton>
                        </div>
                    </div>
                }
                {currentStep === 'companyInfo' && 
                    <div className='flex flex-row gap-8 h-full'>
                        <div className='w-1/2 h-full flex flex-col justify-center'>
                            <img className="mx-auto max-w-[20rem]" src="./images/svg_images/undraw_logo_design.svg" alt="" />
                        </div>
                        <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                            <h2 className='text-2xl text-slate-500'>Your Company Info</h2>
                            <p>
                                Please complete the company information form by providing essential details about your organization. Your input helps us better tailor our services to your business needs and provide you with the best support. Thank you for sharing this information with us.
                            </p>
                            <span className='text-sm font-semibold'>
                                * If you enter a Company Name then the EIN Number and Job Title will be required
                            </span>
                            <div className='my-6'>
                                <CompanyInfo onUpdateInfo={setCompanyInfo} />
                            </div>
                            
                            <PrimaryButton onClick={saveCompanyInfo}>Complete Registration</PrimaryButton>
                        </div>      
                    </div>
          
                }
            
        </div>
    );
}
