import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import Banner from '@/Components/Layouts/Banner';
import NavLink from '@/Components/Navigations/NavLink';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user} showBanner={true} showPortalBody={true}>

            {{
                banner: (
                <Banner size="small" showLeftContent={true} showProfilePhoto={true} />
                ),
                portalBody: (
                <div className="h-full w-full">
                        <div className='settings-nav'>
                            <ul>
                                <li>
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')} activeClass="active-link" >Account Settings</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                </div>
                ),
            }}
        </AuthenticatedLayout>
    );
}
