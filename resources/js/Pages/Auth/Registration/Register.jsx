import { useState, useEffect } from 'react';

import GuestLayout from '@/Layouts/GuestLayout';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import EmailStep from '@/Pages/Auth/Registration/EmailStep';
import PrivacyPolicy from '@/Pages/Auth/Legal/PrivacyPolicy';

import Skeleton from '@mui/joy/Skeleton';













export default function Register() {
    
    const [skeleton, setSkeleton] = useState(false);
    const [isDrawerPanelOpen, setDrawerPanelOpen] = useState(false);

    const toggleDrawerPanel = () => {
        setDrawerPanelOpen(!isDrawerPanelOpen);
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
        
        post(route('register'), {
            // This callback is called before the form submission starts
            onStart: () => setSkeleton(true),
    
            // This callback is called when the form submission is complete
            onFinish: () => setSkeleton(false),
        });
    };
 







    return (
        <GuestLayout>
            {{
                surface: (
                    <div className="relative z-50 w-full h-full">


                        <PrivacyPolicy
                            isDrawerPanelOpen={isDrawerPanelOpen}
                            toggleDrawerPanel={toggleDrawerPanel}
                        />
       
                    </div>
                ),
                form: (
                    <div>

                        <EmailStep
                            formData={data}
                            setFormData={setData} 
                            errors={errors}
                            linkPrivacyPolicy={toggleDrawerPanel}
                            skeleton={skeleton}
                        />
 
                    </div>
                ),
                footer: (
                    <div>

                        {skeleton ? (
                            <div>
                                <Skeleton variant="rectangular" sx={{ height: "38px", width: '106px', marginTop: '1rem' }}/>
                                <Skeleton variant="text" level="body-sm" sx={{ width: '118px', marginTop: '1.2rem'}}/>
                            </div>
                        ):(
                            <div>
                                <SecondaryButton className="block mb-4" onClick={submit} >
                                    Register
                                </SecondaryButton>
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

