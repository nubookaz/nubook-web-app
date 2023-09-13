import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import Input from '@mui/joy/Input';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Tooltip from '@mui/joy/Tooltip';
import { Head, Link, useForm } from '@inertiajs/react';
import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
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

             <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("./images/background_images/guest_image_1.jpg")' }}>
                <div className="overlay">
                    <div className='floating-form flex flex-row justify-center items-center h-full'>

                        <ImageContainer isPoster={true} className="my-auto">
                            <h2 className="mb-4">
                                Did you know?
                            </h2>
                            <ImageContainer isPoster={false} className="mb-4 !h-[28rem]" backgroundImage="./images/background_images/bg_image_2.jpg">
                                {/* Your content here */}
                            </ImageContainer>
                            <h3>
                                TARS, the AI machine in Interstellar, is real.
                            </h3>
                            <p className="p-base mt-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae fugiat doloribus, provident aperiam, atque qui optio illum earum vel quasi molestiae est veniam mollitia fuga et, ipsum dicta sunt!
                            </p>
                        </ImageContainer>

                        <CardContainer className="form-container flex flex-col justify-between">
                            <h2 className="logo-name">Nubook</h2>

                            <p className="secondary-color text-base mb-14">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, aliquam tenetur consequuntur earum dignissimos corporis voluptates tempore perferendis laborum, rem iste at, eligendi totam doloremque tempora esse illum perspiciatis autem.</p>

                            <h1 className="primary-color mb-4 text-4xl">Welcome! Sign up for an account.</h1>

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                            
                            <form onSubmit={submit}>
                                <div>

                                <Tooltip
                                    title="Your Name is Required"
                                    open={true}                                        
                                    placement="top"
                                    arrow
                                    >      
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        value={data.name}
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </Tooltip>
                                </div>

                                <div className="mt-4">

                                <Tooltip
                                    title="Email Address is Required"
                                    open={true}                                        
                                    placement="top"
                                    arrow
                                    >      
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        icon={faEnvelope}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </Tooltip>      
                                </div>

                                <div className="mt-4">

                                <Tooltip
                                    title="Password is Required"
                                    open={true}                                        
                                    placement="top"
                                    arrow
                                    >      
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                </Tooltip>
                                </div>

                                <div className="mt-4">

                                <Tooltip
                                    title="Please re-enter your password"
                                    open={true}                                        
                                    placement="top"
                                    arrow
                                    >      
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                </Tooltip>
                                </div>

                                <div className="flex items-center justify-start my-16">
                                    <SecondaryButton className="ml-4" disabled={processing}>
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
                            </form>

                        </CardContainer>

                    </div>

                </div>
            </div>

            
        </GuestLayout>
    );
}
