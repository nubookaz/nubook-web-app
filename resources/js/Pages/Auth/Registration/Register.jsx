import { useState, useEffect } from 'react';

import GuestLayout from '@/Layouts/GuestLayout';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import EmailStep from '@/Pages/Auth/Registration/EmailStep';














export default function Register() {
    
    const [isValidStepOne, setIsValidStepOne] = useState(false);
    const [errorText, setErrorText] = useState('');
    
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
        post(route('register'));
    };
 
    return (
        <GuestLayout>
            {{
                form: (
                    <div>

                        <EmailStep
                            formData={data}
                            setFormData={setData}
                            errorText={errorText}
                            setIsValidStepOne={setIsValidStepOne}
                        />

                    </div>
                ),
                footer: (
                    <div>

                        <SecondaryButton className="block mb-4" onClick={submit} disabled={!isValidStepOne}>
                            Register
                        </SecondaryButton>
                        <Link href={route('login')} className="text-sm secondary-color">
                            Already registered?
                        </Link>
                    </div>
                ),
            }}
        </GuestLayout>
    );
}

