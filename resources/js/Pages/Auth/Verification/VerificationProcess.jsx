import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import PersonalInfo from '@/Pages/Auth/Partials/PersonalInfo';
import CompanyInfo from '@/Pages/Auth/Partials/CompanyInfo';

export default function VerificationProcess({ 
    currentStep, 
    setCurrentStep, 
     setIsModalOpen,
 }) {

    
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [personalInfo, setPersonalInfo] = useState({
        first_name: '',
        last_name: '',
        middle_initial: '',
        phone: '',
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
    

    
    




    
    // useEffect(() => {
    //     // Set the initial current step based on user progress
    //     if (userProgress?.companyInfoComplete) {
    //         setCurrentStep('someOtherStep'); // Adjust this based on your actual steps
    //     } else if (userProgress?.personalInfoComplete) {
    //         setCurrentStep('companyInfo');
    //     } else if (userProgress?.verificationComplete) {
    //         setCurrentStep('personalInfo');
    //     }
    //     // By default, it will remain on 'verification'
    // }, [userProgress, setCurrentStep]);



    const VerificationStep = () => (
        <div>
            <input
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
        if (response && response.data) {
            if (response.data.success) {
                setError('');
                successCallback();
            } else if (response.data.error) {
                handleError(new Error(response.data.error), response.data.error);
            } else {
                handleError(new Error('Unexpected response structure'), 'Unexpected response structure');
            }
        } else {
            handleError(new Error('Unexpected response structure'), 'Unexpected response structure');
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
 
    

    return (
        <div>
            {currentStep === 'verification' && 
                <div>
                    <VerificationStep />
                    <SecondaryButton onClick={verifyCode}>Verify Code</SecondaryButton>
                </div>
            }
            {currentStep === 'personalInfo' && 
                <div>   
                    <PersonalInfo onUpdatePersonalInfo={setPersonalInfo} />
                    <SecondaryButton onClick={savePersonalInfo}>Register</SecondaryButton>
                </div>
            }
            {currentStep === 'companyInfo' && 
                <div>
                    <CompanyInfo onUpdateCompanyInfo={setCompanyInfo} />
                    <SecondaryButton onClick={saveCompanyInfo}>Register</SecondaryButton>
                </div>                
            }
        </div>
    );
}
