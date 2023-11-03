import SecondaryButton from '@/Components/Buttons/SecondaryButton';



export default function Footer({ currentStep, verifyEmail, handleVerification, savePersonalInfo, saveCompanyInfo, isValidStepOne, loading }) {

    console.log("footer", currentStep);
    console.log("footer", handleVerification);

    return (
        <div className="flex flex-col gap-8">
            {/* {currentStep === 'email' && (
                <div>
                    {!loading ? (
                        <SecondaryButton onClick={verifyEmail} disabled={!isValidStepOne}>
                            Register
                        </SecondaryButton>
                    ) : (
                        <Skeleton variant="rectangular" width={150} height="2.5rem" sx={{ mb: 1 }} />
                    )}
                </div>
            )} */}
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

