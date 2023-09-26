import { useEffect } from 'react';
import Checkbox from '@/Components/Forms/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import Input from '@mui/joy/Input';
import Tooltip from '@mui/joy/Tooltip';

import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import CardContainer from '@/Components/Containers/CardContainer';
import ImageContainer from '@/Components/Containers/ImageContainer';

export default function Login({ status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
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
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        sx={{
                                            "--Input-focusedThickness": "1px",
                                            "--Input-minHeight": "56px",
                                            "--Input-paddingInline": "26px"
                                        }}
                                    />
                                </div>
                                <div className="mt-4">
                    
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                </div>
                                <div className="block mt-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                        </label>
                                    </div>
                                    {canResetPassword && (
                                        <div className="text-right secondary-color">
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm hover:primary-color rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-start my-16">

                                    <SecondaryButton className="ml-4" disabled={processing}>
                                        Log in
                                    </SecondaryButton>
                                </div>

                                <div>
                                    <Link href={route('register')} className="text-sm secondary-color">Don’t have an account? Sign up!</Link>
                                </div>
                            </form>
                            
                        </CardContainer>

                    </div>

                </div>
            </div>

        </GuestLayout>
    );
}
