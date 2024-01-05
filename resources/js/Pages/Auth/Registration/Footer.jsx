import SecondaryButton from '@/Components/Buttons/SecondaryButton';



export default function Footer({ currentStep, verifyEmail, handleVerification, savePersonalInfo, saveCompanyInfo, isValidStepOne, loading }) {
 

    return (
        <div className="flex flex-col gap-8">
 
            {currentStep === 'verification' && (
                <div>
                    <SecondaryButton onClick={handleVerification}>Verify Code</SecondaryButton>
                </div>
            )}
            {currentStep === 'personalInfo' && (
                <div>
                    <SecondaryButton onClick={savePersonalInfo}>Register</SecondaryButton>
                </div>
            )}
            {currentStep === 'companyInfo' && (
                <div>
                    <SecondaryButton onClick={saveCompanyInfo}>Register</SecondaryButton>
                </div>
            )}
        </div>
    );
}

