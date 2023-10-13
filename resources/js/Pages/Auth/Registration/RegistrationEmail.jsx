import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

import Input from '@mui/joy/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Link } from '@inertiajs/react';

import EmailStep from '@/Pages/Auth/Registration/Partials/EmailStep';
import PersonalInfo from '@/Pages/Auth/Registration/Partials/PersonalInfo';
import CompanyInfo from '@/Pages/Auth/Registration/Partials/CompanyInfo';

import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

















export default function Register() {
    const { code, error } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState('email'); // 'email', 'verification', 'personalInfo'
    const [isValidStepOne, setIsValidStepOne] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [verificationCode, setVerificationCode] = useState('');




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

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [companyInfo, setCompanyInfo] = useState({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });


const verifyEmail = async () => {
    try {
        setLoading(true);

        const response = await axios.post(route('register'), {
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        });

        if (response && response.data && response.data.success) {
            setRegistrationComplete(true);
            setErrorText('');
            setCurrentStep('verification'); // Change the step to 'verification'
            return 'User registered successfully';
        } else {
            console.error('Unexpected response structure:', response);
            setErrorText('Unexpected response structure during registration');
            throw new Error('Unexpected response structure during registration');
        }
    } catch (error) {
        console.error('Error registering user:', error);

        if (error.response && error.response.data && error.response.data.errors) {
            // Handle validation errors
            const validationErrors = error.response.data.errors;

            // Example: display the first error for each field
            const errorMessage = Object.values(validationErrors)
                .map((errors) => errors[0])
                .join(' ');

            setErrorText(errorMessage);
        } else {
            setErrorText(error.message || 'Error during registration');
        }
     } finally {
            setLoading(false); // Set loading to false regardless of success or failure
            setFormDisabled(true); // Enable input fields
        }
};
    
    
    
    // Add a state variable to control the disabled state of the form
    const [formDisabled, setFormDisabled] = useState(false);


    // Modify verifyCode to return the response
const verifyCode = async () => {
    try {
        const response = await axios.post(route('registration.verifyCode'), {
            verificationCode: verificationCode,
        },{
            headers: {
                'Accept': 'application/json',
            },
        });

        // Check if response is defined and has a data property
        if (response && response.data && response.data.success) {
            // Verification successful
            setErrorText('');
        } else {
            // If there's an error, set the error message
            setErrorText(response.data.error || 'Error during verification');
        }

        // Return the response
        return response;
    } catch (error) {
        console.error('Error during verification:', error);
        setErrorText('Error during verification');
        // Rethrow the error to be caught in the calling function if needed
        throw error;
    }
};

const handleVerification = async () => {
    try {
        const response = await verifyCode();
        // Check if the verification code is correct before proceeding to the next step
        if (!errorText) {
            // Determine the next step based on your logic
            if (response.data.success) {
                // Verification is successful, move to the next step
                setCurrentStep('personalInfo');
            } else {
                // Handle other cases or conditions
                // setCurrentStep('someOtherStep');
            }
        }
    } catch (error) {
        // Error is already handled in verifyCode function
    }
};

const savePersonalInfo = async () => {
    try {
        const response = await axios.post(route('registration.personal.store'), personalInfo);

        if (response && response.data) {
            if (response.data.success) {

                // Check if personal information is already completed
                if (response.data.message && response.data.message.includes('Personal information already completed')) {
                    setCurrentStep('companyInfo');
                    return 'Personal information saved successfully';
                }

                setCurrentStep('companyInfo');
                return 'Personal information saved successfully';
            } else if (response.data.error) {
                console.error('Error:', response.data.error);
                throw new Error(response.data.error);
            } else {
                console.error('Unexpected response structure:', response.data);
                throw new Error('Error saving personal information');
            }
        } else {
            console.error('Unexpected response:', response);
            throw new Error('Error saving personal information');
        }
    } catch (error) {
        console.error('Error during personal info request:', error.message);
        throw new Error('Error saving personal information');
    }
};

const saveCompanyInfo = async () => {
    try {
        const response = await router.post(route('registration.company.store'), companyInfo);

        if (response && response.data && response.data.success) {
            console.log('Company Info saved successfully');
            // Move to the next step after saving company info
            setCurrentStep('someOtherStep'); // Change to the appropriate next step
        } else if (response && response.data && response.data.error) {
            console.error('Error:', response.data.error);
            // Handle the error if needed
        } else {
            console.error('Unexpected response structure:', response);
            // Handle unexpected response structure
        }
    } catch (error) {
        console.error('Error during company info request:', error.message);
        // Handle the error if needed
    }
};

    return (
        <GuestLayout>
            {{
                form: (
                    <div>
                        {/* Conditionally render the current step */}

                        {currentStep === 'email' && (
                            <>
                                {!loading ? (
                                    <EmailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                        errorText={errorText}
                                        setIsValidStepOne={setIsValidStepOne}
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" width='100%' height="3.5rem" sx={{ mb: 1 }} />
                                )}
                            </>
                        )}

                        {currentStep === 'verification' && (
                            <VerificationStep
                                error={error}
                                verificationCode={verificationCode}
                                setVerificationCode={setVerificationCode}
                            />
                        )}
                        {currentStep === 'personalInfo' && (
                            <PersonalInfo onUpdatePersonalInfo={setPersonalInfo} />
                        )}
                        {currentStep === 'companyInfo' && (
                            <CompanyInfo onUpdateCompanyInfo={setCompanyInfo} />
                        )}
                    </div>
                ),
                footer: (
                    <div>
                        {/* Conditionally render the footer for the current step */}
                        {currentStep === 'email' && (
                            <EmailFooter onVerifyEmail={verifyEmail} isValidStepOne={isValidStepOne} currentStep={currentStep} loading={loading} />
                        )}
                        {currentStep === 'verification' && (
                            <VerificationFooter onVerification={handleVerification} />
                        )}
                        {currentStep === 'personalInfo' && (
                            <PersonalInfoFooter onSavePersonalInfo={savePersonalInfo} />
                        )}
                        {currentStep === 'companyInfo' && (
                            <CompanyInfoFooter onSaveCompanyInfo={saveCompanyInfo} />
                        )}
                    </div>
                ),
            }}
        </GuestLayout>
    );
}


 
function VerificationStep({ error, verificationCode, setVerificationCode }) {
    return (
        <div>
            {/* Your verification step implementation here */}
            <input
                id="verification_code"
                name="code"
                placeholder="One Time Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
            />
            {/* Other input fields, error messages, etc. */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}














function EmailFooter({ onVerifyEmail, isValidStepOne, currentStep, loading }) {
    const handleClick = async () => {
        if (!loading) {
            // If not already loading, initiate the action
            onVerifyEmail();
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            {currentStep === 'email' && (
                <div>
                    {!loading ? (
                        <SecondaryButton onClick={handleClick} disabled={!isValidStepOne}>
                            Register
                        </SecondaryButton>
                    ) : (
                        <Skeleton variant="rectangular" width={150} height="2.5rem" sx={{ mb: 1 }} />
                    )}
                </div>
            )}            
            <Link href={route('login')} className="text-sm secondary-color">
                Already registered?
            </Link>
        </div>
    );
}



function VerificationFooter({ onVerification }) {
    return (
        <div className='flex flex-col gap-8'>
            <div>
                <SecondaryButton onClick={onVerification}>Verify Code</SecondaryButton>
            </div>      
            {/* Other footer content */}
            <Link href={route('login')} className="text-sm secondary-color">
                Already registered?
            </Link>
        </div>
    );
}

function PersonalInfoFooter({ onSavePersonalInfo }) {
    return (
        <div>
            <div className="mb-4">
                <SecondaryButton onClick={onSavePersonalInfo}>
                    Register
                </SecondaryButton>
            </div>
            <div>
                <Link href={route('login')} className="text-sm secondary-color">
                    Already registered?
                </Link>
            </div>
        </div>
    );
}

function CompanyInfoFooter({ onSaveCompanyInfo }) {
    return (
        <div>
            <div className="mb-4">                        
                <SecondaryButton onClick={onSaveCompanyInfo}>
                    Register
                </SecondaryButton>
            </div>
            <div>
                <Link href={route('login')} className="text-sm secondary-color">
                    Already registered?
                </Link>
            </div>
        </div>
    );
}