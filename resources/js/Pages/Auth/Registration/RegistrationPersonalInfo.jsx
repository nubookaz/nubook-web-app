import GuestLayout from '@/Layouts/GuestLayout';
import PersonalInfo from '@/Pages/Auth/Registration/Partials/PersonalInfo';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function RegistrationPersonalInfo() {
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


    console.log("Personal Info",personalInfo);

    const savePersonalInfo = () => {
        return new Promise((resolve, reject) => {
            router
                .post(route('registration.personal.store'), personalInfo)
                .then((response) => {
                    console.log('Personal Info saved:', response);
                    if (response.data.success) {
                        resolve('Personal information saved successfully');
                    } else {
                        console.error('Error:', response.data.error);
                        reject('Error saving personal information');
                    }
                })
                .catch((error) => {
                    console.error('Error saving personal information:', error);
                    reject('Error saving personal information');
                });
        });
    };
    
    
    return (
        <GuestLayout>
            {{
                form: (
                    <div>
                        {/* Pass setPersonalInfo as a callback to update state */}
                        <PersonalInfo onUpdatePersonalInfo={setPersonalInfo} />
                    </div>
                ),
                footer: (
                    <div>
                        <div className="mb-4">
                            <SecondaryButton onClick={savePersonalInfo}>
                                Register
                            </SecondaryButton>
                        </div>
                        <div>
                            <Link href={route('login')} className="text-sm secondary-color">
                                Already registered?
                            </Link>
                        </div>
                    </div>
                ),
            }}
        </GuestLayout>
    );
}
