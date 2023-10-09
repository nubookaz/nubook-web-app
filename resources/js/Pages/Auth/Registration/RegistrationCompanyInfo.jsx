import GuestLayout from '@/Layouts/GuestLayout';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { router } from '@inertiajs/react';
import { useState } from 'react';



import { Head, Link, useForm } from '@inertiajs/react';
import Input from '@mui/joy/Input';



export default function RegistrationCompanyInfo() {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        ein_number: '',
        job_title: '',
        number_of_employees: '',
        referral: '',
    });

    const registerCompanyInfo = async () => {
        try {
            // Use axios.post to save company information
            // Make sure to include the CSRF token if your application requires it
            await router.post(route('registration.company.store'), data);

            // If needed, you can add logic for success, like redirecting to the next step
        } catch (error) {
            console.error('Error saving company information:', error);

            // If needed, you can handle errors here
        }
    };

    return (

        <GuestLayout>
            {{
                form: (
                    <div>
                        <div>
                            <Input
                                id="company_name"
                                type="text"
                                name="company_name"
                                placeholder="Company Name"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                            />
                            <Input
                                id="ein_number"
                                type="text"
                                name="ein_number"
                                placeholder="Ein Number"
                                value={data.ein_number}
                                onChange={(e) => setData('ein_number', e.target.value)}
                            />
                            <Input
                                id="job_title"
                                type="text"
                                name="job_title"
                                placeholder="Job Title"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
                            />
                            <Input
                                id="number_of_employees"
                                type="text"
                                name="number_of_employees"
                                placeholder="Number of Employees"
                                value={data.number_of_employees}
                                onChange={(e) => setData('number_of_employees', e.target.value)}
                            />
                            <Input
                                id="referral"
                                type="text"
                                name="referral"
                                placeholder="Where did you hear about us?"
                                value={data.referral}
                                onChange={(e) => setData('referral', e.target.value)}
                            />
                        </div>
                    </div>
                ),
                footer: (
                    <div>
                        <div className="mb-4">
                            <SecondaryButton onClick={registerCompanyInfo}>
                                Register
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
