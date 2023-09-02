import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

import CardContainer from '@/Components/CardContainer';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PageButton from '@/Components/PageButton';

import ProfilePicture from '@/Components/ProfilePicture';
import CustomTextInput from '@/Components/Forms/CustomTextInput';


export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <CardContainer header="Hello!" showButtonIcon={true}>
                        <div>You're logged in!</div>
                        <PrimaryButton>I am a button</PrimaryButton>
                        <SecondaryButton>I am a secondary button</SecondaryButton>
                        <PageButton icon={faPlus} onClick={() => { /* Handle click */ }} />
                    </CardContainer>
                    <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                    <CustomTextInput
                placeholder="Username"
                icon={<FontAwesomeIcon icon={faUser} />}
            />
            <ProfilePicture
                alt="User's Profile"
                width={150} // Adjust the width as needed
                height={150} // Adjust the height as needed
            />
                
                </div>
            </div>

        </AuthenticatedLayout>
            
    );
}
