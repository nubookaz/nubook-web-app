import { Link, Head } from '@inertiajs/react';

import ApplicationName from "@/Components/Branding/ApplicationName";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default function HeaderNavigation({onClick}) {

    return (
        <div className="flex flex-col text-center justify-between w-full 2xl:justify-center xl:max-w-[60%] 2xl:max-w-[30%] xl:text-left xl:flex-row">
            {/* <div id="navicon" className='block text-left xl:hidden'>
                <FontAwesomeIcon className='text-2xl text-white cursor-pointer' onClick={onClick} icon={faBars} />
            </div> */}
            <ApplicationName href={route('website.home')} className="mt-4 xl:mt-0" />
            {/* <div className="hidden xl:flex flex-row gap-10 font-bold"> */}
                {/* <p className="text-white block my-auto">Features</p>
                <p className="text-white block my-auto">Pricing</p> */}
                {/* <Link
                    href={route('login')}
                    className="text-white block my-auto"
                >
                    Log in
                </Link>
                <PrimaryButton href={route('register')}>Create An Account</PrimaryButton>
            </div> */}
        </div>
    );

}