import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

import Input from '@mui/joy/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';

import { Link } from '@inertiajs/react';


export default function RegistrationVerification() {
    const { code, error } = usePage().props;
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState(error || '');
    
    const verifyCode = async () => {
        try {
            const response = await router.post(route('registration.verifyCode'), {
                code: verificationCode,
            });
    
            console.log("Code", verificationCode);
    
            // Check if response is defined and has a data property
            if (response && response.data) {
                // If there's an error, set the error message
                setVerificationError(response.data.error || 'Error during verification');
            } else {
                // Handle the case where response or response.data is undefined
                setVerificationError('Error during verification');
            }
        } catch (error) {
            console.log("Code", verificationCode);
    
            console.error('Error during verification:', error);
            setVerificationError('Error during verification');
        }
    };
    
    

    return (


        <GuestLayout>
            {{
                form: (
                    <div>

                        <Input
                            id="one_time_code"
                            name="code"
                            placeholder="One Time Code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />

                        {verificationError && <div style={{ color: 'red' }}>{verificationError}</div>}
                    </div>
                ),
                footer: (
                    <div>
                        <div className="mb-4">
                            <SecondaryButton onClick={verifyCode}>
                                Verify Code
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
