import { useAuth } from '@/Components/Contexts/AuthContext';

import React, { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';



export default function VerificationStep({

    error,
    setCurrentStep,
    handleError,
    handleResponse,

}){

    const { userData } = useAuth();
    const [verificationCode, setVerificationCode] = useState('');

    const [timer, setTimer] = useState(null);
    const [showTimer, setShowTimer] = useState(false);
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const [lastResendTime, setLastResendTime] = useState(null);
    const [isResending, setIsResending] = useState(false);
    const [codeExpiresAt, setCodeExpiresAt] = useState(null);

    const onResendCode = async () => {
        setIsResending(true);  
        try {
            const response = await axios.post(route('verification.resendCode'), {}, {
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            handleResponse(response, () => {
                if (response.data.success) {
                    setCodeExpiresAt(response.data.newCodeExpiresAt);  
                    setLastResendTime(new Date());
                    setIsTimerExpired(false);
                }
            });
        } catch (error) {
            handleError(error, 'Error during verification');
        } finally {
            setIsResending(false); 
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
            });
        } catch (error) {
            handleError(error, 'Error during verification');
        }
    };

    useEffect(() => {
        if (!userData || !userData.code_expires_at) {
            return;
        }
        setShowTimer(true);
        const expirationTime = new Date(userData.code_expires_at + 'Z').getTime();
        const currentTime = Date.now();
        if (currentTime >= expirationTime) {
            setIsTimerExpired(true);
            return;
        }
        setIsTimerExpired(false);
        setTimer({});
        setShowTimer(true);
        const interval = setInterval(() => {
            const newCurrentTime = Date.now();
            const difference = expirationTime - newCurrentTime;
    
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
    }, [userData.code_expires_at]);

    return (

        <div className='flex flex-row gap-8 h-full'>
            <div className='w-1/2 h-full flex flex-col justify-center'>
                <img className="mx-auto max-w-[15rem]" src="./images/svg_images/undraw_mailbox.svg" alt="" />
            </div>
            <div className='w-1/2 my-auto h-auto justify-center flex flex-col gap-6'>
                <h2 className='text-2xl text-slate-500'>Verify Your Email</h2>
                <p>To ensure the security of your account, please check your email inbox for a verification code. To complete the verification process, paste the code in the provided field. Thank you for confirming your email address and enhancing your account's security.</p>
                
                    {isTimerExpired ? (
                            <>
                                <p className='text-center w-full p-6 bg-slate-50 flex-none'>Your verification code has expired.</p>
                                {isResending ? (
                                    <p>Loading...</p> 
                                ) : (
                                    <PrimaryButton className='h-full grow' onClick={onResendCode}>Resend Verification Code</PrimaryButton>
                                )}
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    id="verification_code"
                                    name="code"
                                    className='text-center'
                                    placeholder="One Time Code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                />
                                {error && <div style={{ color: 'red' }}>{error}</div>}
                                {showTimer ? (
                                    <div className='text-center secondary-color mb-4'>Time Remaining to Verify: {timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</div>
                                ):null}
                                <PrimaryButton onClick={verifyCode}>Verify Code</PrimaryButton>
                                <p className='h-full grow text-center text-sm cursor-pointer' onClick={onResendCode}>Resend Verification Code</p>

                            </>
                    )}
            </div>
        </div>
    );

}
    

