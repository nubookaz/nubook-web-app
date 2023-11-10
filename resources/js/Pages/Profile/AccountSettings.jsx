import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function AccountSettings() {

    const bannerProps = {
        showGreeting: true, // Customize these props based on your conditions
    };

    console.log(bannerProps);
    
        return (
        <AuthenticatedLayout bannerProps={bannerProps}>
            {{
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
                            <h1>This is the Account Settings Page</h1>
                        </div>
                    </div>
                ),
            }}
        </AuthenticatedLayout>
    );
}
