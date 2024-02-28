import { useAuth } from '@/Components/Contexts/AuthContext';

import { useState, useEffect } from 'react';

import GuestLayout from '@/Layouts/GuestLayout';
 import { Link, useForm } from '@inertiajs/react';
import EmailStep from '@/Pages/Auth/Registration/EmailStep';

import Skeleton from '@mui/joy/Skeleton';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';


export default function Register() {
    const { checkAuthStatus, fetchUserData } = useAuth();

    const [skeleton, setSkeleton] = useState(false);
    const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);
    const [showConsentError, setShowConsentError] = useState(false);

    const triggerConsentHelperText = () => {
        setShowConsentError(true);
    };

    const handlePrivacyPolicyModal = () => {
        setPrivacyPolicyModal(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);
 
    const submit = (e) => {
        e.preventDefault();

        if (!data.consent) {
            setShowConsentError(true); 
            return;
        }    
        
        post(route('register'), {
            onStart: () => setSkeleton(true),
            onFinish: () => setSkeleton(false),
            onSuccess: () => {
                checkAuthStatus();
                fetchUserData();
            },
        });
    };

    const greeting = ['Speed Up', <br key="linebreak"/>, 'Production!'];

    return (
        <GuestLayout
            greeting={greeting}
            imgUrl = '/images/background_images/bg_image_6.jpg'
            isModalOpen = {privacyPolicyModal}
            // closeModal
        >
        {{
            body: (
                    <div className='flex flex-col gap-8 justify-between h-full'>
                        <div className=''>
                            <EmailStep
                                formData={data}
                                setFormData={setData} 
                                errors={errors}
                                linkPrivacyPolicy={handlePrivacyPolicyModal}
                                skeleton={skeleton}
                                privacyPolicyHref='#privacy-policy'
                                showConsentError={showConsentError}
                            />
                        </div>
                
                        {skeleton ? (
                            <div>
                                <Skeleton variant="rectangular" sx={{ height: "38px", width: '106px', marginTop: '1rem' }}/>
                                <Skeleton variant="text" level="body-sm" sx={{ width: '118px', marginTop: '1.2rem'}}/>
                            </div>
                        ):(
                            <div>
                                <PrimaryButton className="block mb-4" onClick={submit} >
                                    Register
                                </PrimaryButton>
                                <Link href={route('login')} className="text-sm secondary-color">
                                    Already registered?
                                </Link>
                            </div>
                        )}
                       
                    </div>
                ),
            }}
        </GuestLayout>
    );
}

