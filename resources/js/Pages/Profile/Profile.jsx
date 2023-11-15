import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import Banner from '@/Layouts/Partials/Banner';

export default function Profile() {
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
                                    <NavLink href="#"
                                        icon={faProjectDiagram}>
                                        Profile Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href={route('profile.edit')} active={route().current('profile.edit')} activeClass="active-link" icon={faProjectDiagram}>Profile Edit</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                            <h1>This is the profile page</h1>
                        </div>
                </div>
                ),
            }}
        </AuthenticatedLayout>
    );
}
