import { useEffect } from 'react';
import Checkbox from '@/Components/Forms/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';

import { Link, useForm } from '@inertiajs/react';

import { formGroupClass, inputGroupClass } from '@/Components/Scripts/Form';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import Input from '@/Components/Forms/Input';


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

    const greeting = ['Welcome', <br key="linebreak"/>, 'Back!'];

    return (
        <GuestLayout
            greeting={greeting}
            imgUrl = '/images/background_images/bg_image_2.jpg'
        >
        {{
            body: (
                <div className='flex flex-col gap-4 h-full justify-between'>
                    <div className='flex flex-col gap-8 items-center h-full'>
                        <div className='w-full h-full flex flex-col gap-4'>
                            <div className={inputGroupClass}>
                                    <label htmlFor="email" value="email" className='text-gray-400 text-sm'> Email Address * </label>
                                    <Input
                                        id="email"
                                        title='Email'
                                        type="email"
                                        name="email"
                                        placeholder="indy@indianajones.com"
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
                                <div className={inputGroupClass}>
                                    <label htmlFor="password" value="password" className='text-gray-400 text-sm'> Password * </label>
                                    <Input
                                        id="password"
                                        title='Password'
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>

                                <div className="text-left justify-between w-full flex flex-row gap-4">
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


                            {errors.email && (
                                <div className='text-red-600 text-center p-4 bg-red-50 rounded-xl mt-6'>{errors.email}</div>
                            )}
                            
                        </div>
                    
                    </div>



                        <div className='flex flex-col gap-4'>
                            <div>
                                <PrimaryButton onClick={submit} disabled={processing}>
                                    Login
                                </PrimaryButton>
                            </div>

                            <div>
                                <Link
                                    href={route('register')}
                                    className="text-sm secondary-color"
                                >
                                    Don't have an account? Sign up!
                                </Link>
                            </div>
                        </div>

                </div>                   
             ),
        }}            
    </GuestLayout>

    );
}
