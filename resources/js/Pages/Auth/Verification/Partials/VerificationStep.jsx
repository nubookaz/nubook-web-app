import React, { useState, useEffect } from 'react';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { router } from '@inertiajs/react';

import Skeleton from '@mui/joy/Skeleton';




export default function VerificationStep({

    user,
    error,
    setCurrentStep,
    handleError,
    handleResponse,
    fetchUserData,

}){

    const [verificationCode, setVerificationCode] = useState('');

    const [timer, setTimer] = useState(null);
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const [lastResendTime, setLastResendTime] = useState(null);



    const onResendCode = async () => {

        try {
            const response = await axios.post(route('verification.resendCode'), {}, {
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            handleResponse(response, async () => { // Declare this function as async
                if (response.data.success) {
                   setLastResendTime(new Date());
                   setIsTimerExpired(false);

                   await fetchUserData();

                }
             });
        } catch (error) {
            handleError(error, 'Error during verification');
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





    useEffect(() => {
        setIsTimerExpired(false);

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const expirationTime = new Date(user.code_expires_at + 'Z').getTime();
            const difference = expirationTime - currentTime;
 

             if (difference > 0) {
                setTimer({
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                clearInterval(interval);
                setIsTimerExpired(true);
            }
        }, 1000);
    
        return () => clearInterval(interval);
    }, [user, lastResendTime]);
    




    return (

        <div className='flex flex-row gap-8 h-full'>
            <div className='w-1/2 h-full flex flex-col justify-center'>
                <img className="mx-auto max-w-[15rem]" src="./images/svg_images/undraw_mailbox.svg" alt="" />
            </div>
            <div className='w-1/2 my-auto h-full justify-center flex flex-col gap-6'>
                <h2>Verify Your Email</h2>
                <p>
                    To ensure the security of your account, please check your email inbox for a verification code. To complete the verification process, paste the code in the provided field. Thank you for confirming your email address and enhancing your account's security.
                </p>
                
                   
                    {isTimerExpired ? (
                        <>
                            <p className='text-center w-full p-6 bg-slate-50 flex-none'>Your verification code has expired.</p>
                            <SecondaryButton className='h-full grow' onClick={onResendCode}>Resend Verification Code</SecondaryButton>
                        </>
                    ) : (
                        <>
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
                            {timer && (
                                <div className='text-center secondary-color mb-4'>Time Remaining to Verify: {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</div>
                            )}
                            <SecondaryButton onClick={verifyCode}>Verify Code</SecondaryButton>
                        </>
                    )}

            </div>
        </div>
        
    );

}
    

